// Marvel API Types
export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: MarvelImage;
  resourceURI: string;
  comics: MarvelResourceList;
  series: MarvelResourceList;
  stories: MarvelResourceList;
  events: MarvelResourceList;
  urls: MarvelUrl[];
}

export interface MarvelImage {
  path: string;
  extension: string;
}

export interface MarvelResourceList {
  available: number;
  collectionURI: string;
  items: MarvelResourceSummary[];
  returned: number;
}

export interface MarvelResourceSummary {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface MarvelUrl {
  type: string;
  url: string;
}

export interface MarvelApiResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MarvelDataContainer<T>;
}

export interface MarvelDataContainer<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

// App Types
export interface FavoriteHero {
  id: number;
  name: string;
  thumbnail: MarvelImage;
  dateAdded: string;
}

export interface HeroFilters {
  search?: string;
  nameStartsWith?: string;
  orderBy: "name" | "-name" | "modified" | "-modified";
  comics?: number;
  series?: number;
  events?: number;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export type Theme = "light" | "dark";

export type ViewMode = "grid" | "list";

// Context Types
export interface AppState {
  heroes: MarvelCharacter[];
  loading: boolean;
  error: string | null;
  favorites: FavoriteHero[];
  theme: Theme;
  viewMode: ViewMode;
  filters: HeroFilters;
  pagination: PaginationState;
}

export type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_HEROES"; payload: MarvelCharacter[] }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_FAVORITE"; payload: FavoriteHero }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_FILTERS"; payload: Partial<HeroFilters> }
  | { type: "SET_PAGINATION"; payload: Partial<PaginationState> }
  | { type: "RESET_FILTERS" };
