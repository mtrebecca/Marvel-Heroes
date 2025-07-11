import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { Loading } from "../components/common/Loading";

const renderLoading = (props = {}) => {
  return render(
    <MantineProvider>
      <Loading {...props} />
    </MantineProvider>
  );
};

describe("Loading", () => {
  it("deve renderizar com mensagem padrão", () => {
    renderLoading();
    expect(screen.getByText("Carregando heróis...")).toBeInTheDocument();
  });

  it("deve renderizar com mensagem personalizada", () => {
    renderLoading({ message: "Carregando dados..." });
    expect(screen.getByText("Carregando dados...")).toBeInTheDocument();
  });

  it("deve renderizar mensagem padrão quando message é undefined", () => {
    renderLoading({ message: undefined });
    expect(screen.getByText("Carregando heróis...")).toBeInTheDocument();
  });

  it("deve renderizar centralizado por padrão", () => {
    const { container } = renderLoading();
    expect(container.querySelector(".mantine-Center-root")).toBeInTheDocument();
  });

  it("deve renderizar não centralizado quando centered é false", () => {
    const { container } = renderLoading({ centered: false });
    expect(
      container.querySelector(".mantine-Center-root")
    ).not.toBeInTheDocument();
  });

  it("deve usar minHeight personalizado", () => {
    const { container } = renderLoading({ minHeight: "40vh" });
    const centerElement = container.querySelector(".mantine-Center-root");
    expect(centerElement).toHaveStyle({ minHeight: "40vh" });
  });

  it("deve renderizar o loader do Mantine", () => {
    const { container } = renderLoading();
    expect(container.querySelector(".mantine-Loader-root")).toBeInTheDocument();
  });
});
