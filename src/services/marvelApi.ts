import axios, { AxiosError } from "axios";
import md5 from "md5";
import { MarvelApiResponse, MarvelCharacter, HeroFilters } from "../types";

const BASE_URL = "https://gateway.marvel.com/v1/public";

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY || "";
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY || "";

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 30000;

const generateAuthParams = () => {
  const ts = Date.now().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

  return {
    ts,
    apikey: PUBLIC_KEY,
    hash,
  };
};

const marvelApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

marvelApi.interceptors.request.use((config) => {
  const authParams = generateAuthParams();
  config.params = { ...config.params, ...authParams };
  return config;
});

marvelApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error(
        "Invalid Marvel API credentials. Check your keys and referrer domains."
      );
    } else if (error.response?.status === 429) {
      console.error(
        "Rate limit exceeded. Please wait before making more requests."
      );
    } else if (error.response?.status === 409) {
      console.error("Missing API authentication parameters.");
    }
    return Promise.reject(error);
  }
);

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: unknown) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const marvelApiService = {
  isApiAvailable(): boolean {
    return true;
  },

  async getCharacters(
    offset: number = 0,
    limit: number = 20,
    filters: Partial<HeroFilters> = {}
  ): Promise<MarvelApiResponse<MarvelCharacter>> {
    const params: Record<string, string | number> = {
      offset,
      limit,
    };

    if (filters.nameStartsWith) params.nameStartsWith = filters.nameStartsWith;
    if (filters.search) params.nameStartsWith = filters.search;
    if (filters.orderBy) params.orderBy = filters.orderBy;
    if (filters.comics) params.comics = filters.comics;
    if (filters.series) params.series = filters.series;
    if (filters.events) params.events = filters.events;

    const cacheKey = `characters-${JSON.stringify(params)}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await marvelApi.get<MarvelApiResponse<MarvelCharacter>>(
        "/characters",
        { params }
      );

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  },

  async getCharacterById(id: number): Promise<MarvelCharacter | null> {
    const cacheKey = `character-${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await marvelApi.get<MarvelApiResponse<MarvelCharacter>>(
        `/characters/${id}`
      );

      const character = response.data.data.results[0] || null;
      setCachedData(cacheKey, character);
      return character;
    } catch (error) {
      console.error("Error fetching character:", error);
      return null;
    }
  },

  async getCharacterComics(id: number, limit: number = 10) {
    const cacheKey = `comics-${id}-${limit}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/comics`, {
        params: { limit, orderBy: "-onsaleDate" },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching character comics:", error);
      return { data: { results: [] } };
    }
  },

  async getCharacterSeries(id: number, limit: number = 10) {
    const cacheKey = `series-${id}-${limit}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/series`, {
        params: { limit, orderBy: "-startYear" },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching character series:", error);
      return { data: { results: [] } };
    }
  },

  async getCharacterEvents(id: number, limit: number = 10) {
    const cacheKey = `events-${id}-${limit}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await marvelApi.get(`/characters/${id}/events`, {
        params: { limit },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching character events:", error);
      return { data: { results: [] } };
    }
  },

  clearCache(): void {
    cache.clear();
  },
};

export const getImageUrl = (
  thumbnail: { path: string; extension: string },
  size: string = "standard_xlarge"
) => {
  return `${thumbnail.path}/${size}.${thumbnail.extension}`;
};

export default marvelApiService;
