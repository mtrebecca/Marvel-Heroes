import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { AppProvider } from "./store/context/AppContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { HeroDetailPage } from "./pages/HeroDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";

function App() {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const theme = localStorage.getItem("marvel-theme") || "light";
    setColorScheme(theme as "light" | "dark");
  }, [setColorScheme]);

  return (
    <AppProvider>
      <Router>
        <AppShell className="marvel-bg-pattern">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="hero/:id" element={<HeroDetailPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </AppShell>
      </Router>
    </AppProvider>
  );
}

export default App;
