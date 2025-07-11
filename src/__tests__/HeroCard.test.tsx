import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import HeroCard from "../components/heroes/HeroCard";
import { MarvelCharacter } from "../types";

// Mock do hook useFavorites
const mockToggleFavorite = vi.fn();
const mockIsFavorite = vi.fn();

vi.mock("../hooks", () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  }),
}));

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockHero: MarvelCharacter = {
  id: 1,
  name: "Spider-Man",
  description: "Friendly neighborhood Spider-Man",
  modified: "2023-01-01",
  thumbnail: {
    path: "https://example.com/spiderman",
    extension: "jpg",
  },
  resourceURI: "https://example.com/spiderman",
  comics: { available: 100, collectionURI: "", items: [], returned: 0 },
  series: { available: 50, collectionURI: "", items: [], returned: 0 },
  stories: { available: 200, collectionURI: "", items: [], returned: 0 },
  events: { available: 10, collectionURI: "", items: [], returned: 0 },
  urls: [],
};

const renderHeroCard = (hero: MarvelCharacter = mockHero) => {
  return render(
    <MantineProvider>
      <BrowserRouter>
        <HeroCard hero={hero} />
      </BrowserRouter>
    </MantineProvider>
  );
};

describe("HeroCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  it("deve renderizar o nome do herói", () => {
    renderHeroCard();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("deve renderizar a descrição do herói", () => {
    renderHeroCard();
    expect(
      screen.getByText("Friendly neighborhood Spider-Man")
    ).toBeInTheDocument();
  });

  it("deve renderizar informações de quadrinhos, séries e eventos", () => {
    renderHeroCard();
    expect(screen.getByText(/Quadrinhos: 100/)).toBeInTheDocument();
    expect(screen.getByText(/Séries: 50/)).toBeInTheDocument();
    expect(screen.getByText(/Eventos: 10/)).toBeInTheDocument();
  });

  it("deve navegar para a página de detalhes quando clicado", () => {
    renderHeroCard();
    const cardContainer = screen.getByRole("button").parentElement;
    fireEvent.click(cardContainer);
    expect(mockNavigate).toHaveBeenCalledWith("/hero/1");
  });

  it("deve alternar favorito quando o botão de coração é clicado", () => {
    renderHeroCard();
    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockHero);
  });

  it('deve exibir "Nenhuma descrição disponível" quando não há descrição', () => {
    const heroWithoutDescription = { ...mockHero, description: "" };
    renderHeroCard(heroWithoutDescription);
    expect(
      screen.getByText("Nenhuma descrição disponível.")
    ).toBeInTheDocument();
  });

  it("deve mostrar o ícone de favorito preenchido quando é favorito", () => {
    mockIsFavorite.mockReturnValue(true);
    renderHeroCard();
    const favoriteButton = screen.getByRole("button");
    expect(favoriteButton).toHaveAttribute("data-variant", "filled");
  });
});
