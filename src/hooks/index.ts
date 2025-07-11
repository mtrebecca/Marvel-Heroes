import React from "react";
import { useApp } from "../store/context/AppContext";
import { marvelApiService } from "../services/marvelApi";
import { FavoriteHero, MarvelCharacter } from "../types";
import { useRef } from "react";
import { notifications } from "@mantine/notifications";
import { Heart, HeartOff } from "lucide-react";

export const useHeroes = () => {
  const { state, dispatch } = useApp();
  const isLoadingRef = useRef(false);

  const fetchHeroes = async (page: number = 1) => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    dispatch({ type: "SET_LOADING", payload: true });

    if (!marvelApiService.isApiAvailable()) {
      dispatch({
        type: "SET_ERROR",
        payload:
          "Marvel API is temporarily unavailable. Please wait a moment and try again.",
      });
      isLoadingRef.current = false;
      return;
    }

    try {
      const offset = (page - 1) * state.pagination.itemsPerPage;
      const response = await marvelApiService.getCharacters(
        offset,
        state.pagination.itemsPerPage,
        state.filters
      );

      dispatch({ type: "SET_HEROES", payload: response.data.results });
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          currentPage: page,
          totalItems: response.data.total,
          totalPages: Math.ceil(
            response.data.total / state.pagination.itemsPerPage
          ),
        },
      });
    } catch (error) {
      let errorMessage = "Failed to fetch heroes";

      if (error instanceof Error) {
        if (error.message.includes("API temporarily unavailable")) {
          errorMessage = error.message;
        } else if (error.message.includes("Rate limit")) {
          errorMessage =
            "API rate limit exceeded. Please wait before making more requests.";
        } else if (error.message.includes("Invalid API credentials")) {
          errorMessage =
            "Invalid Marvel API credentials. Please check your configuration.";
        } else {
          errorMessage = error.message;
        }
      }

      dispatch({
        type: "SET_ERROR",
        payload: errorMessage,
      });
    } finally {
      isLoadingRef.current = false;
    }
  };

  const searchHeroes = async (searchTerm: string) => {
    const newFilters = {
      ...state.filters,
      nameStartsWith: searchTerm.trim() || undefined,
    };

    dispatch({ type: "SET_FILTERS", payload: newFilters });
    await fetchHeroes(1);
  };

  const sortHeroes = async (
    orderBy: "name" | "-name" | "modified" | "-modified"
  ) => {
    dispatch({ type: "SET_FILTERS", payload: { orderBy } });
    await fetchHeroes(1);
  };

  const resetFilters = async () => {
    dispatch({ type: "RESET_FILTERS" });
    await fetchHeroes(1);
  };

  return {
    heroes: state.heroes,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    filters: state.filters,
    fetchHeroes,
    searchHeroes,
    sortHeroes,
    resetFilters,
  };
};

export const useFavorites = () => {
  const { state, dispatch } = useApp();

  const isFavorite = (heroId: number): boolean => {
    return state.favorites.some((fav) => fav.id === heroId);
  };

  const addToFavorites = (hero: MarvelCharacter) => {
    if (!isFavorite(hero.id)) {
      const favorite: FavoriteHero = {
        id: hero.id,
        name: hero.name,
        thumbnail: hero.thumbnail,
        dateAdded: new Date().toISOString(),
      };
      dispatch({ type: "ADD_FAVORITE", payload: favorite });

      // Show success notification
      notifications.show({
        title: "Herói adicionado aos favoritos!",
        message: `${hero.name} foi adicionado à sua lista de favoritos.`,
        color: "red",
        icon: React.createElement(Heart, { size: 16 }),
        autoClose: 3000,
      });
    }
  };

  const removeFromFavorites = (heroId: number) => {
    const hero = state.favorites.find((fav) => fav.id === heroId);
    dispatch({ type: "REMOVE_FAVORITE", payload: heroId });

    if (hero) {
      notifications.show({
        title: "Herói removido dos favoritos",
        message: `${hero.name} foi removido da sua lista de favoritos.`,
        color: "gray",
        icon: React.createElement(HeartOff, { size: 16 }),
        autoClose: 3000,
      });
    }
  };

  const toggleFavorite = (hero: MarvelCharacter) => {
    if (isFavorite(hero.id)) {
      removeFromFavorites(hero.id);
    } else {
      addToFavorites(hero);
    }
  };

  return {
    favorites: state.favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
};

export const useViewMode = () => {
  const { state, dispatch } = useApp();

  const toggleViewMode = () => {
    const newMode = state.viewMode === "grid" ? "list" : "grid";
    dispatch({ type: "SET_VIEW_MODE", payload: newMode });
  };

  const setViewMode = (mode: "grid" | "list") => {
    dispatch({ type: "SET_VIEW_MODE", payload: mode });
  };

  return {
    viewMode: state.viewMode,
    toggleViewMode,
    setViewMode,
  };
};
