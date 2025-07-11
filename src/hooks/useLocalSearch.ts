import { useState, useMemo } from "react";
import { MarvelCharacter } from "../types";

export const useLocalSearch = (
  heroes: MarvelCharacter[],
  searchTerm: string
) => {
  const filteredHeroes = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return heroes;
    }

    const term = searchTerm.toLowerCase().trim();

    const filtered = heroes.filter((hero) => {
      const nameMatch = hero.name.toLowerCase().includes(term);
      const descriptionMatch =
        hero.description && hero.description.toLowerCase().includes(term);
      const matches = nameMatch || descriptionMatch;

      return matches;
    });

    return filtered;
  }, [heroes, searchTerm]);

  return filteredHeroes;
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
