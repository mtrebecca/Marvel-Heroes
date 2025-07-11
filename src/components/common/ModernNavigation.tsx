import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Group,
  Button,
  ActionIcon,
  Badge,
  Drawer,
  Stack,
  Text,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import {
  Home,
  Heart,
  Menu as MenuIcon,
  X,
  Grid,
  List,
  Sun,
  Moon,
} from "lucide-react";
import { useViewMode, useFavorites } from "../../hooks";

export const ModernNavigation: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { viewMode, toggleViewMode } = useViewMode();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isFavoritesPage = location.pathname === "/favorites";

  const navigationItems = [
    {
      name: "Heróis",
      path: "/",
      icon: Home,
      isActive: isHomePage,
      description: "Descubra os heróis da Marvel",
    },
    {
      name: "Favoritos",
      path: "/favorites",
      icon: Heart,
      isActive: isFavoritesPage,
      description: "Seus heróis favoritos",
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  const handleThemeToggle = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    toggleColorScheme();
    localStorage.setItem("marvel-theme", newScheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Group gap="xs" visibleFrom="lg">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <Button
                component={Link}
                to={item.path}
                variant={item.isActive ? "filled" : "subtle"}
                color={item.isActive ? "red" : "gray"}
                leftSection={<Icon size={18} />}
                rightSection={
                  item.badge ? (
                    <Badge size="sm" color="red" variant="filled">
                      {item.badge > 9 ? "9+" : item.badge}
                    </Badge>
                  ) : null
                }
                styles={{
                  root: {
                    background: item.isActive
                      ? "linear-gradient(135deg, var(--marvel-red) 0%, var(--marvel-red-dark) 100%)"
                      : "transparent",
                    border: "none",
                    color: item.isActive ? "white" : "var(--text-primary)",
                    transition: "all var(--transition-normal)",
                  },
                  inner: {
                    fontFamily: "Marvel, sans-serif",
                    fontWeight: 600,
                  },
                }}>
                {item.name}
              </Button>
            </motion.div>
          );
        })}
      </Group>

      <Group gap="xs">
        {isHomePage && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ActionIcon
              variant="subtle"
              onClick={toggleViewMode}
              title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
              style={{
                color: "var(--text-primary)",
                transition: "all var(--transition-normal)",
              }}>
              {viewMode === "grid" ? <List size={18} /> : <Grid size={18} />}
            </ActionIcon>
          </motion.div>
        )}

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ActionIcon
            variant="subtle"
            onClick={handleThemeToggle}
            title={`Switch to ${
              colorScheme === "light" ? "dark" : "light"
            } mode`}
            style={{
              color: "var(--text-primary)",
              transition: "all var(--transition-normal)",
            }}>
            <AnimatePresence mode="wait">
              {colorScheme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </ActionIcon>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ActionIcon
            variant="subtle"
            onClick={toggleMobileMenu}
            hiddenFrom="lg"
            style={{
              color: "var(--text-primary)",
              transition: "all var(--transition-normal)",
            }}>
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  <MenuIcon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </ActionIcon>
        </motion.div>
      </Group>

      <Drawer
        opened={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="right"
        size="xs"
        title="Menu"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          header: {
            backgroundColor: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-primary)",
          },
          body: {
            backgroundColor: "var(--bg-secondary)",
            padding: "20px",
          },
          title: {
            fontFamily: "Marvel, sans-serif",
            fontWeight: 700,
            color: "var(--text-primary)",
          },
        }}>
        <Stack gap="md">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}>
                <Button
                  component={Link}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant={item.isActive ? "filled" : "subtle"}
                  color={item.isActive ? "red" : "gray"}
                  fullWidth
                  leftSection={<Icon size={18} />}
                  rightSection={
                    item.badge ? (
                      <Badge size="sm" color="red" variant="filled">
                        {item.badge > 9 ? "9+" : item.badge}
                      </Badge>
                    ) : null
                  }
                  styles={{
                    root: {
                      background: item.isActive
                        ? "linear-gradient(135deg, var(--marvel-red) 0%, var(--marvel-red-dark) 100%)"
                        : "transparent",
                      justifyContent: "flex-start",
                      height: "48px",
                    },
                    inner: {
                      fontFamily: "Marvel, sans-serif",
                      fontWeight: 600,
                    },
                    section: {
                      marginLeft: "8px",
                    },
                  }}>
                  <Box style={{ flex: 1, textAlign: "left" }}>
                    <Text size="sm" fw={600}>
                      {item.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {item.description}
                    </Text>
                  </Box>
                </Button>
              </motion.div>
            );
          })}
          {isHomePage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}>
              <Button
                variant="subtle"
                color="gray"
                fullWidth
                leftSection={
                  viewMode === "grid" ? <List size={18} /> : <Grid size={18} />
                }
                onClick={() => {
                  toggleViewMode();
                  setIsMobileMenuOpen(false);
                }}
                styles={{
                  root: {
                    justifyContent: "flex-start",
                    height: "48px",
                  },
                  inner: {
                    fontFamily: "Marvel, sans-serif",
                    fontWeight: 600,
                  },
                }}>
                <Box style={{ flex: 1, textAlign: "left" }}>
                  <Text size="sm" fw={600}>
                    {viewMode === "grid" ? "Visualização de Lista" : "Visualização de Grid"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Alterar a forma como os heróis são exibidos
                  </Text>
                </Box>
              </Button>
            </motion.div>
          )}
        </Stack>
      </Drawer>
    </>
  );
};
