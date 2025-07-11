import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { AppShell, Container, useMantineColorScheme } from "@mantine/core";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";

export const Layout: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    localStorage.setItem("marvel-theme", colorScheme);
  }, [colorScheme]);

  return (
    <AppShell
      header={{ height: 80 }}
      styles={{
        main: {
          backgroundColor: "var(--bg-primary)",
          minHeight: "calc(100vh - 80px)",
          paddingTop: "80px",
          display: "flex",
          flexDirection: "column",
        },
      }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" style={{ position: "relative", flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <Outlet />
          </motion.div>
        </Container>

        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};
