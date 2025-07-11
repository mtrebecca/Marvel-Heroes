import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLocalSearch } from "../hooks/useLocalSearch";
import { MarvelCharacter } from "../types";

const mockHeroes: MarvelCharacter[] = [
  {
    id: 1,
    name: "Spider-Man",
    description: "Friendly neighborhood Spider-Man",
    modified: "2023-01-01",
    thumbnail: { path: "path1", extension: "jpg" },
    resourceURI: "uri1",
    comics: { available: 100, collectionURI: "", items: [], returned: 0 },
    series: { available: 50, collectionURI: "", items: [], returned: 0 },
    stories: { available: 200, collectionURI: "", items: [], returned: 0 },
    events: { available: 10, collectionURI: "", items: [], returned: 0 },
    urls: [],
  },
  {
    id: 2,
    name: "Iron Man",
    description: "Genius, billionaire, playboy, philanthropist",
    modified: "2023-01-02",
    thumbnail: { path: "path2", extension: "jpg" },
    resourceURI: "uri2",
    comics: { available: 80, collectionURI: "", items: [], returned: 0 },
    series: { available: 30, collectionURI: "", items: [], returned: 0 },
    stories: { available: 150, collectionURI: "", items: [], returned: 0 },
    events: { available: 8, collectionURI: "", items: [], returned: 0 },
    urls: [],
  },
  {
    id: 3,
    name: "Captain America",
    description: "Super soldier from World War II",
    modified: "2023-01-03",
    thumbnail: { path: "path3", extension: "jpg" },
    resourceURI: "uri3",
    comics: { available: 90, collectionURI: "", items: [], returned: 0 },
    series: { available: 40, collectionURI: "", items: [], returned: 0 },
    stories: { available: 180, collectionURI: "", items: [], returned: 0 },
    events: { available: 12, collectionURI: "", items: [], returned: 0 },
    urls: [],
  },
];

describe("useLocalSearch", () => {
  it("deve retornar todos os heróis quando searchTerm está vazio", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, ""));
    expect(result.current).toEqual(mockHeroes);
  });

  it("deve retornar todos os heróis quando searchTerm é apenas espaços", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "   "));
    expect(result.current).toEqual(mockHeroes);
  });

  it("deve filtrar heróis por nome (case insensitive)", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "spider"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Spider-Man");
  });

  it("deve filtrar heróis por nome com case diferente", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "IRON"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Iron Man");
  });

  it("deve filtrar heróis por descrição", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "genius"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Iron Man");
  });

  it("deve filtrar heróis por termo parcial no nome", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "man"));
    expect(result.current).toHaveLength(2);
    expect(result.current.map((h) => h.name)).toContain("Spider-Man");
    expect(result.current.map((h) => h.name)).toContain("Iron Man");
  });

  it("deve retornar array vazio quando nenhum herói corresponde", () => {
    const { result } = renderHook(() => useLocalSearch(mockHeroes, "batman"));
    expect(result.current).toHaveLength(0);
  });

  it("deve filtrar corretamente com espaços extras", () => {
    const { result } = renderHook(() =>
      useLocalSearch(mockHeroes, "  spider  ")
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Spider-Man");
  });

  it("deve lidar com heróis sem descrição", () => {
    const heroesWithoutDesc = [
      {
        ...mockHeroes[0],
        description: "",
      },
    ];

    const { result } = renderHook(() =>
      useLocalSearch(heroesWithoutDesc, "spider")
    );
    expect(result.current).toHaveLength(1);
  });
});
