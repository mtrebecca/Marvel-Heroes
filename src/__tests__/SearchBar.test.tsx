import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { SearchBar } from "../components/common/SearchBar";

const renderSearchBar = (props = {}) => {
  const defaultProps = {
    onSearch: vi.fn(),
    onClear: vi.fn(),
    ...props,
  };

  return {
    ...render(
      <MantineProvider>
        <SearchBar {...defaultProps} />
      </MantineProvider>
    ),
    props: defaultProps,
  };
};

describe("SearchBar", () => {
  it("deve renderizar com placeholder padrão", () => {
    renderSearchBar();
    expect(screen.getByPlaceholderText("Buscar heróis...")).toBeInTheDocument();
  });

  it("deve renderizar com placeholder personalizado", () => {
    renderSearchBar({ placeholder: "Buscar por nome..." });
    expect(
      screen.getByPlaceholderText("Buscar por nome...")
    ).toBeInTheDocument();
  });

  it("deve chamar onSearch quando o valor muda", () => {
    const { props } = renderSearchBar();
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Spider" } });

    expect(props.onSearch).toHaveBeenCalledWith("Spider");
  });

  it("deve exibir valor inicial quando searchTerm é fornecido", () => {
    renderSearchBar({ searchTerm: "Iron Man" });
    expect(screen.getByDisplayValue("Iron Man")).toBeInTheDocument();
  });

  it("deve mostrar botão de limpar quando há texto", () => {
    renderSearchBar({ searchTerm: "Spider" });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("deve chamar onClear e onSearch quando botão de limpar é clicado", () => {
    const { props } = renderSearchBar({ searchTerm: "Spider" });
    const clearButton = screen.getByRole("button");

    fireEvent.click(clearButton);

    expect(props.onClear).toHaveBeenCalled();
    expect(props.onSearch).toHaveBeenCalledWith("");
  });

  it("deve limpar o campo quando botão de limpar é clicado", () => {
    renderSearchBar({ searchTerm: "Spider" });
    const input = screen.getByRole("textbox");
    const clearButton = screen.getByRole("button");

    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
  });
});
