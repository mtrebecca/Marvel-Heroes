import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Center,
  Group,
  Card,
  Image,
  ActionIcon,
} from "@mantine/core";
import { Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks";

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleCardClick = (heroId: number) => {
    navigate(`/hero/${heroId}`);
  };

  const handleRemoveFavorite = (e: React.MouseEvent, heroId: number) => {
    e.stopPropagation();
    removeFromFavorites(heroId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container size="lg" style={{ paddingBottom: "4rem" }}>
        <Stack gap="xl" style={{ padding: "24px 0" }}>
          <motion.div variants={itemVariants}>
            <Center>
              <Stack align="center" gap="md">
                <Group gap="sm">
                  <Heart size={28} style={{ color: "var(--marvel-red)" }} />
                  <Title
                    order={1}
                    className="marvel-text-gradient"
                    style={{
                      fontFamily: "Marvel, sans-serif",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                    }}>
                    Heróis Favoritos
                  </Title>
                </Group>
                <Text size="lg" c="dimmed" ta="center">
                  Sua coleção de heróis favoritos da Marvel
                </Text>
                <Text
                  size="sm"
                  c="dimmed"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-secondary)",
                  }}>
                  <Heart size={16} />
                  {favorites.length} favorito{favorites.length !== 1 ? "s" : ""}
                </Text>
              </Stack>
            </Center>
          </motion.div>

          <motion.div variants={itemVariants}>
            {favorites.length > 0 ? (
              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing="md">
                {favorites.map((hero, index) => {
                  const imageUrl =
                    hero.thumbnail &&
                    hero.thumbnail.path &&
                    hero.thumbnail.extension
                      ? `${hero.thumbnail.path}.${hero.thumbnail.extension}`
                      : undefined;

                  return (
                    <motion.div
                      key={hero.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                          cursor: "pointer",
                          height: "100%",
                          position: "relative",
                        }}
                        onClick={() => handleCardClick(hero.id)}>
                        <Stack gap="md" style={{ height: "100%" }}>
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={hero.name}
                              height={220}
                              fit="cover"
                              radius="md"
                            />
                          )}

                          <Group justify="space-between" align="flex-start">
                            <Text fw={700} size="lg" style={{ flex: 1 }}>
                              {hero.name}
                            </Text>
                            <ActionIcon
                              variant="filled"
                              color="red"
                              size="md"
                              onClick={(e) => handleRemoveFavorite(e, hero.id)}
                              style={{
                                flexShrink: 0,
                                zIndex: 1,
                              }}>
                              <Heart size={16} fill="currentColor" />
                            </ActionIcon>
                          </Group>

                          <Text size="xs" c="dimmed" mt="auto">
                            Adicionado em{" "}
                            {new Date(hero.dateAdded).toLocaleDateString(
                              "pt-BR"
                            )}
                          </Text>
                        </Stack>
                      </Card>
                    </motion.div>
                  );
                })}
              </SimpleGrid>
            ) : (
              <Center style={{ minHeight: "40vh" }}>
                <Stack align="center" gap="md">
                  <Users size={48} style={{ color: "var(--text-tertiary)" }} />
                  <Title order={3} c="dimmed">
                    Nenhum herói favorito ainda
                  </Title>
                  <Text size="sm" c="dimmed" ta="center">
                    Comece explorando heróis e adicione-os aos seus favoritos!
                  </Text>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => navigate("/")}
                      className="marvel-button">
                      Explorar Heróis
                    </button>
                  </motion.div>
                </Stack>
              </Center>
            )}
          </motion.div>
        </Stack>
      </Container>
    </motion.div>
  );
};
