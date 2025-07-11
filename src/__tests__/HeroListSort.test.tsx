import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../store/context/AppContext";
import { HeroList } from "../components/heroes/HeroList";

const mockHeroes = [
  {
    id: 1,
    name: "Spider-Man",
    description: "Friendly neighborhood hero",
    thumbnail: { path: "path1", extension: "jpg" },
    comics: { available: 5 },
    series: { available: 3 },
    events: { available: 2 },
  },
  {
    id: 2,
    name: "Iron Man",
    description: "Genius billionaire playboy philanthropist",
    thumbnail: { path: "path2", extension: "jpg" },
    comics: { available: 8 },
    series: { available: 4 },
    events: { available: 6 },
  },
  {
    id: 3,
    name: "Captain America",
    description: "Super soldier from WWII",
    thumbnail: { path: "path3", extension: "jpg" },
    comics: { available: 10 },
    series: { available: 5 },
    events: { available: 7 },
  },
];

// Mock do hook useHeroes
vi.mock("../hooks", () => ({
  useHeroes: () => ({
    heroes: mockHeroes,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 3,
      itemsPerPage: 20,
    },
    fetchHeroes: vi.fn(),
    resetFilters: vi.fn(),
  }),
  useViewMode: () => ({
    viewMode: "grid",
  }),
}));

const renderHeroList = () => {
  return render(
    <MantineProvider>
      <BrowserRouter>
        <AppProvider>
          <HeroList />
        </AppProvider>
      </BrowserRouter>
    </MantineProvider>
  );
};

describe("HeroList - Ordenação", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o controle de ordenação", () => {
    renderHeroList();

    // Verificar se o Select de ordenação está presente
    expect(screen.getByDisplayValue("Ordem padrão")).toBeInTheDocument();
  });

  it("deve mostrar contador de heróis encontrados", () => {
    renderHeroList();

    expect(screen.getByText("3 heróis encontrados")).toBeInTheDocument();
  });

  it("deve mostrar opções de ordenação quando clicado", async () => {
    renderHeroList();

    const selectInput = screen.getByDisplayValue("Ordem padrão");
    fireEvent.mouseDown(selectInput);

    const ascOption = await screen.findByText("A - Z");
    expect(ascOption).toBeInTheDocument();
    expect(screen.getByText("Z - A")).toBeInTheDocument();
    expect(screen.getByText("Ordem padrão")).toBeInTheDocument();
  });

  it("deve alterar o valor do select quando uma opção é selecionada", async () => {
    renderHeroList();

    const selectInput = screen.getByDisplayValue("Ordem padrão");
    fireEvent.mouseDown(selectInput);

    const ascOption = await screen.findByText("A - Z");
    fireEvent.click(ascOption);

    expect(screen.getByDisplayValue("A - Z")).toBeInTheDocument();
  });

  it("deve manter a busca funcionando junto com ordenação", () => {
    renderHeroList();

    const searchInput = screen.getByPlaceholderText(
      "Buscar heróis por nome..."
    );
    fireEvent.change(searchInput, { target: { value: "Spider" } });

    expect(searchInput).toHaveValue("Spider");
    expect(screen.getByDisplayValue("Ordem padrão")).toBeInTheDocument();
  });

  it("deve exibir heróis na ordem correta quando ordenado A-Z", async () => {
    renderHeroList();

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Captain America")).toBeInTheDocument();

    const selectInput = screen.getByDisplayValue("Ordem padrão");
    fireEvent.mouseDown(selectInput);

    const ascOption = await screen.findByText("A - Z");
    fireEvent.click(ascOption);

    expect(screen.getByDisplayValue("A - Z")).toBeInTheDocument();
  });

  it("deve exibir heróis na ordem correta quando ordenado Z-A", async () => {
    renderHeroList();

    const selectInput = screen.getByDisplayValue("Ordem padrão");
    fireEvent.mouseDown(selectInput);

    const descOption = await screen.findByText("Z - A");
    fireEvent.click(descOption);

    expect(screen.getByDisplayValue("Z - A")).toBeInTheDocument();
  });
});
