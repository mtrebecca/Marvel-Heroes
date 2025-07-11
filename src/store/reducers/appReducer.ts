import { AppState, AppAction } from "../../types";

export const initialState: AppState = {
  heroes: [],
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem("marvel-favorites") || "[]"),
  theme: (localStorage.getItem("marvel-theme") as "light" | "dark") || "dark",
  viewMode:
    (localStorage.getItem("marvel-view-mode") as "grid" | "list") || "grid",
  filters: {
    search: "",
    nameStartsWith: undefined,
    orderBy: "name",
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    totalPages: 0,
  },
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_HEROES":
      return {
        ...state,
        heroes: action.payload,
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "ADD_FAVORITE": {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem("marvel-favorites", JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites,
      };
    }

    case "REMOVE_FAVORITE": {
      const newFavorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
      localStorage.setItem("marvel-favorites", JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites,
      };
    }

    case "SET_THEME":
      localStorage.setItem("marvel-theme", action.payload);
      return {
        ...state,
        theme: action.payload,
      };

    case "SET_VIEW_MODE":
      localStorage.setItem("marvel-view-mode", action.payload);
      return {
        ...state,
        viewMode: action.payload,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case "SET_PAGINATION":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {
          search: "",
          nameStartsWith: undefined,
          orderBy: "name",
        },
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      };

    default:
      return state;
  }
};
