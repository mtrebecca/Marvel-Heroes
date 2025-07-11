import axios, { AxiosError } from "axios";
import md5 from "md5";
import { MarvelApiResponse, MarvelCharacter, HeroFilters } from "../types";

// Marvel API configuration
const BASE_URL = "https://gateway.marvel.com/v1/public";

// You need to get these from https://developer.marvel.com/
const PUBLIC_KEY =
  import.meta.env.VITE_MARVEL_PUBLIC_KEY || "56290192c88bd50ac41f2f4e43518054";
const PRIVATE_KEY =
  import.meta.env.VITE_MARVEL_PRIVATE_KEY ||
  "bb7bcbe5c1e207ac2f69e619318c931bbb6ac585";

// Validate configuration on load
const validateApiConfiguration = () => {
  const issues: string[] = [];

  if (!PUBLIC_KEY || PUBLIC_KEY === "56290192c88bd50ac41f2f4e43518054") {
    issues.push("56290192c88bd50ac41f2f4e43518054 is not configured");
  }

  if (
    !PRIVATE_KEY ||
    PRIVATE_KEY === "bb7bcbe5c1e207ac2f69e619318c931bbb6ac585"
  ) {
    issues.push("bb7bcbe5c1e207ac2f69e619318c931bbb6ac585 is not configured");
  }

  return issues.length === 0;
};

validateApiConfiguration();

// Rate limiting and error management with request deduplication
class ApiErrorManager {
  private static instance: ApiErrorManager;
  private isBlocked: boolean = false;
  private blockUntil: number = 0;
  private consecutiveErrors: number = 0;
  private lastErrorTime: number = 0;
  private readonly MAX_CONSECUTIVE_ERRORS = 3;
  private readonly BLOCK_DURATION = 60000; // 1 minute
  private readonly ERROR_RESET_TIME = 300000; // 5 minutes

  // Request deduplication
  private pendingRequests: Map<string, Promise<unknown>> = new Map();
  private requestCache: Map<string, { data: unknown; timestamp: number }> =
    new Map();
  private readonly CACHE_DURATION = 30000; // 30 seconds cache

  static getInstance(): ApiErrorManager {
    if (!ApiErrorManager.instance) {
      ApiErrorManager.instance = new ApiErrorManager();
    }
    return ApiErrorManager.instance;
  }

  canMakeRequest(): boolean {
    const now = Date.now();

    // Check if we're still blocked
    if (this.isBlocked && now < this.blockUntil) {
      return false;
    }

    // Reset block if time has passed
    if (this.isBlocked && now >= this.blockUntil) {
      this.isBlocked = false;
      this.consecutiveErrors = 0;
    }

    // Reset consecutive errors if enough time has passed since last error
    if (now - this.lastErrorTime > this.ERROR_RESET_TIME) {
      this.consecutiveErrors = 0;
    }

    return true;
  }

  handleError(error: AxiosError): void {
    const now = Date.now();
    this.lastErrorTime = now;

    // Handle specific Marvel API error codes based on documentation
    if (error.response?.status === 429) {
      // Rate limit exceeded
      this.blockRequests(
        "Rate limit exceeded. Please wait before making more requests."
      );
      return;
    }

    if (error.response?.status === 409) {
      // Marvel-specific 409 errors: Missing API key, hash, or timestamp
      const errorData = error.response?.data as { status?: string };
      const message = errorData?.status || "Authentication parameter missing";

      if (message.includes("Missing API key")) {
        this.blockRequests(
          "API key is missing. Please check your configuration."
        );
      } else if (message.includes("Missing hash")) {
        this.blockRequests(
          "Hash parameter is missing. Server-side authentication required."
        );
      } else if (message.includes("Missing timestamp")) {
        this.blockRequests(
          "Timestamp parameter is missing. Server-side authentication required."
        );
      } else {
        this.blockRequests(`Authentication error: ${message}`);
      }
      return;
    }

    if (error.response?.status === 401) {
      // Invalid referrer or invalid hash
      const errorData = error.response?.data as { status?: string };
      const message = errorData?.status || "Unauthorized access";

      if (message.includes("Invalid referrer")) {
        this.blockRequests(
          "Invalid referrer. Add 'localhost' (without port) to authorized referrers in Marvel Developer Portal. " +
            "Current domain: " +
            window.location.hostname
        );
      } else if (message.includes("Invalid hash")) {
        this.blockRequests(
          "Invalid hash. Please check your private key configuration."
        );
      } else {
        this.blockRequests(
          "Invalid API credentials. Please check your Marvel API keys."
        );
      }
      return;
    }

    if (error.response?.status === 403) {
      // Forbidden - user doesn't have access to endpoint
      this.blockRequests(
        "Access forbidden. Your API keys may not have permission for this endpoint."
      );
      return;
    }

    if (error.response?.status === 405) {
      // Method not allowed
      this.blockRequests("HTTP method not allowed for this endpoint.");
      return;
    }

    // Handle consecutive errors
    this.consecutiveErrors++;
    if (this.consecutiveErrors >= this.MAX_CONSECUTIVE_ERRORS) {
      this.blockRequests(
        `Too many consecutive errors (${this.consecutiveErrors}). Temporarily blocking requests.`
      );
    }
  }

  private blockRequests(reason: string): void {
    this.isBlocked = true;
    this.blockUntil = Date.now() + this.BLOCK_DURATION;
    console.error(
      `[Marvel API] ${reason} Blocked until: ${new Date(
        this.blockUntil
      ).toLocaleTimeString()}`
    );

    // Dispatch custom event for UI to handle
    window.dispatchEvent(
      new CustomEvent("marvelApiBlocked", {
        detail: { reason, blockedUntil: this.blockUntil },
      })
    );
  }

  getBlockInfo(): { isBlocked: boolean; reason?: string; unblockTime?: Date } {
    if (!this.isBlocked) return { isBlocked: false };

    return {
      isBlocked: true,
      reason: "API temporarily blocked due to errors",
      unblockTime: new Date(this.blockUntil),
    };
  }

  // Request deduplication methods
  generateRequestKey(url: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
      .filter((key) => !["ts", "hash"].includes(key)) // Exclude auth params that change every time
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return `${url}?${sortedParams}`;
  }

  async deduplicateRequest<T>(
    requestKey: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    const cached = this.requestCache.get(requestKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }

    const pendingRequest = this.pendingRequests.get(requestKey);
    if (pendingRequest) {
      return pendingRequest as Promise<T>;
    }


    const request = requestFn()
      .then((data) => {
        this.requestCache.set(requestKey, {
          data,
          timestamp: Date.now(),
        });
        return data;
      })
      .finally(() => {
        this.pendingRequests.delete(requestKey);
      });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  clearCache(): void {
    this.requestCache.clear();
    this.pendingRequests.clear();
  }
}

const marvelApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

const generateAuthParams = () => {
  const ts = Date.now().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

  return {
    ts,
    apikey: PUBLIC_KEY,
    hash,
  };
};

marvelApi.interceptors.request.use((config) => {
  const errorManager = ApiErrorManager.getInstance();

  if (!errorManager.canMakeRequest()) {
    const blockInfo = errorManager.getBlockInfo();
    return Promise.reject(
      new Error(`API is temporarily blocked. ${blockInfo.reason}`)
    );
  }

  const authParams = generateAuthParams();
  config.params = { ...config.params, ...authParams };
  return config;
});

marvelApi.interceptors.response.use(
  (response) => {
    const errorManager = ApiErrorManager.getInstance();
    errorManager["consecutiveErrors"] = 0;
    return response;
  },
  (error: AxiosError) => {
    const errorManager = ApiErrorManager.getInstance();
    errorManager.handleError(error);
    return Promise.reject(error);
  }
);

export const marvelApiService = {
  getErrorManager() {
    return ApiErrorManager.getInstance();
  },

  isApiAvailable(): boolean {
    return ApiErrorManager.getInstance().canMakeRequest();
  },

  clearCache(): void {
    ApiErrorManager.getInstance().clearCache();
  },

  // Get characters with filters and enhanced error handling
  async getCharacters(
    offset: number = 0,
    limit: number = 20,
    filters: Partial<HeroFilters> = {}
  ): Promise<MarvelApiResponse<MarvelCharacter>> {
    const errorManager = ApiErrorManager.getInstance();

    if (!errorManager.canMakeRequest()) {
      const blockInfo = errorManager.getBlockInfo();
      throw new Error(`API temporarily unavailable: ${blockInfo.reason}`);
    }

    const params: Record<string, string | number> = {
      offset,
      limit,
    };

    // Add filters
    if (filters.nameStartsWith) {
      params.nameStartsWith = filters.nameStartsWith;
    }

    if (filters.search) {
      params.nameStartsWith = filters.search;
    }

    if (filters.orderBy) {
      params.orderBy = filters.orderBy;
    }

    if (filters.comics) {
      params.comics = filters.comics;
    }

    if (filters.series) {
      params.series = filters.series;
    }

    if (filters.events) {
      params.events = filters.events;
    }

    // Generate request key for deduplication
    const requestKey = errorManager.generateRequestKey("/characters", params);

    // Use deduplication to prevent multiple simultaneous requests
    return errorManager.deduplicateRequest(requestKey, async () => {
      const response = await marvelApi.get<MarvelApiResponse<MarvelCharacter>>(
        "/characters",
        {
          params,
        }
      );

      return response.data;
    });
  },

  // Get single character by ID with enhanced error handling
  async getCharacterById(id: number): Promise<MarvelCharacter | null> {
    const errorManager = ApiErrorManager.getInstance();

    if (!errorManager.canMakeRequest()) {
      console.warn(
        "API temporarily unavailable, cannot fetch character details"
      );
      return null;
    }

    const requestKey = errorManager.generateRequestKey(`/characters/${id}`, {});

    try {
      return await errorManager.deduplicateRequest(requestKey, async () => {
        const response = await marvelApi.get<
          MarvelApiResponse<MarvelCharacter>
        >(`/characters/${id}`);
        return response.data.data.results[0] || null;
      });
    } catch (error) {
      console.error("Error fetching character:", error);
      return null;
    }
  },

  // Get character comics with enhanced error handling
  async getCharacterComics(id: number, limit: number = 10) {
    const errorManager = ApiErrorManager.getInstance();

    if (!errorManager.canMakeRequest()) {
      console.warn(
        "API temporarily unavailable, cannot fetch character comics"
      );
      return { data: { results: [] } };
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/comics`, {
        params: { limit, orderBy: "-onsaleDate" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching character comics:", error);
      return { data: { results: [] } };
    }
  },

  // Get character series with enhanced error handling
  async getCharacterSeries(id: number, limit: number = 10) {
    const errorManager = ApiErrorManager.getInstance();

    if (!errorManager.canMakeRequest()) {
      console.warn(
        "API temporarily unavailable, cannot fetch character series"
      );
      return { data: { results: [] } };
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/series`, {
        params: { limit, orderBy: "-startYear" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching character series:", error);
      return { data: { results: [] } };
    }
  },

  // Get character events with enhanced error handling
  async getCharacterEvents(id: number, limit: number = 10) {
    const errorManager = ApiErrorManager.getInstance();

    if (!errorManager.canMakeRequest()) {
      console.warn(
        "API temporarily unavailable, cannot fetch character events"
      );
      return { data: { results: [] } };
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/events`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching character events:", error);
      return { data: { results: [] } };
    }
  },
};

// Utility function to get full image URL
export const getImageUrl = (
  thumbnail: { path: string; extension: string },
  size: string = "standard_xlarge"
) => {
  return `${thumbnail.path}/${size}.${thumbnail.extension}`;
};

export default marvelApiService;
