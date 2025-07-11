import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  Image,
  Stack,
  Group,
  Title,
  Text,
  Button,
  ActionIcon,
  Badge,
  SimpleGrid,
  Center,
  Alert,
  Box,
} from "@mantine/core";
import {
  ArrowLeft,
  Heart,
  Book,
  Trophy,
  Star,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { MarvelCharacter } from "../types";
import { marvelApiService, getImageUrl } from "../services/marvelApi";
import { useFavorites } from "../hooks";
import { Loading } from "../components/common/Loading";
import { formatDate } from "../utils";

interface MarvelComic {
  id: number;
  title: string;
  dates: Array<{ type: string; date: string }>;
}

interface MarvelSeries {
  id: number;
  title: string;
  startYear: number;
}

export const HeroDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<MarvelCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comics, setComics] = useState<MarvelComic[]>([]);
  const [series, setSeries] = useState<MarvelSeries[]>([]);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchHeroDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const heroData = await marvelApiService.getCharacterById(parseInt(id));
        if (!heroData) {
          setError("Hero not found");
          return;
        }

        setHero(heroData);

        const [comicsData, seriesData] = await Promise.all([
          marvelApiService.getCharacterComics(parseInt(id), 6),
          marvelApiService.getCharacterSeries(parseInt(id), 6),
        ]);

        setComics(comicsData.data.results);
        setSeries(seriesData.data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch hero details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [id]);

  if (loading) {
    return (
      <Center style={{ minHeight: "80vh" }}>
        <Loading />
      </Center>
    );
  }

  if (error || !hero) {
    return (
      <Center style={{ minHeight: "80vh" }}>
        <Alert
          icon={<AlertCircle size={20} />}
          title="Error"
          color="red"
          style={{ maxWidth: 400 }}>
          <Text size="sm" mb="md">
            {error || "Hero not found"}
          </Text>
          <Button component={Link} to="/" color="red" variant="filled">
            Voltar aos Heróis
          </Button>
        </Alert>
      </Center>
    );
  }

  const imageUrl = getImageUrl(hero.thumbnail, "detail");
  const isFav = isFavorite(hero.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <Container size="lg" style={{ paddingBottom: "4rem" }}>
        <Stack gap="xl">
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <Button
              component={Link}
              to="/"
              variant="subtle"
              leftSection={<ArrowLeft size={16} />}
              style={{ color: "var(--text-primary)" }}>
              Voltar aos Heróis
            </Button>
          </motion.div>

          <Card
            className="hero-card"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}>
            <Group gap="xl" align="flex-start" wrap="nowrap">
              <Box style={{ position: "relative" }}>
                <Image
                  src={imageUrl}
                  alt={hero.name}
                  w={300}
                  h={400}
                  fit="cover"
                  radius="md"
                  style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                  }}>
                  <ActionIcon
                    size="lg"
                    variant={isFav ? "filled" : "light"}
                    color="red"
                    onClick={() => toggleFavorite(hero)}
                    style={{
                      backgroundColor: isFav
                        ? "var(--marvel-red)"
                        : "rgba(255, 255, 255, 0.9)",
                      color: isFav ? "white" : "var(--marvel-red)",
                      backdropFilter: "blur(8px)",
                    }}>
                    <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                  </ActionIcon>
                </motion.div>
              </Box>

              <Stack gap="md" style={{ flex: 1 }}>
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs">
                    <Title
                      order={1}
                      className="marvel-text-gradient"
                      style={{
                        fontFamily: "Marvel, sans-serif",
                        fontSize: "2.5rem",
                        fontWeight: 700,
                      }}>
                      {hero.name}
                    </Title>
                    <Badge
                      size="lg"
                      color="yellow"
                      variant="light"
                      leftSection={<Star size={14} />}>
                      Marvel Hero
                    </Badge>
                  </Stack>
                </Group>

                <Text
                  size="lg"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    maxWidth: "600px",
                  }}>
                  {hero.description ||
                    "A powerful Marvel hero with incredible abilities and a rich history in the Marvel Universe. Known for their bravery, strength, and dedication to protecting the innocent."}
                </Text>

                <SimpleGrid cols={3} spacing="md" style={{ maxWidth: "400px" }}>
                  <Card
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      background: "var(--bg-secondary)",
                    }}>
                    <Stack gap="xs" align="center">
                      <Book size={24} style={{ color: "var(--marvel-blue)" }} />
                      <Text
                        fw={700}
                        size="xl"
                        style={{ color: "var(--text-primary)" }}>
                        {hero.comics.available}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Comics
                      </Text>
                    </Stack>
                  </Card>

                  <Card
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      background: "var(--bg-secondary)",
                    }}>
                    <Stack gap="xs" align="center">
                      <Trophy
                        size={24}
                        style={{ color: "var(--marvel-yellow)" }}
                      />
                      <Text
                        fw={700}
                        size="xl"
                        style={{ color: "var(--text-primary)" }}>
                        {hero.series.available}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Series
                      </Text>
                    </Stack>
                  </Card>

                  <Card
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      background: "var(--bg-secondary)",
                    }}>
                    <Stack gap="xs" align="center">
                      <Star size={24} style={{ color: "var(--marvel-red)" }} />
                      <Text
                        fw={700}
                        size="xl"
                        style={{ color: "var(--text-primary)" }}>
                        {hero.events.available}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Events
                      </Text>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Stack>
            </Group>
          </Card>

          {comics.length > 0 && (
            <Card
              className="hero-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}>
              <Stack gap="md">
                <Group gap="sm">
                  <Book size={24} style={{ color: "var(--marvel-blue)" }} />
                  <Title
                    order={2}
                    style={{
                      fontFamily: "Marvel, sans-serif",
                      color: "var(--text-primary)",
                    }}>
                    Featured Comics
                  </Title>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                  {comics
                    .slice(0, 6)
                    .map((comic: MarvelComic, index: number) => (
                      <motion.div
                        key={comic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}>
                        <Card
                          style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-primary)",
                          }}>
                          <Group gap="sm">
                            <Box
                              style={{
                                width: 60,
                                height: 80,
                                background:
                                  "linear-gradient(135deg, var(--marvel-red) 0%, var(--marvel-blue) 100%)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}>
                              <Book size={24} color="white" />
                            </Box>
                            <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                              <Text
                                fw={600}
                                lineClamp={2}
                                style={{ color: "var(--text-primary)" }}>
                                {comic.title}
                              </Text>
                              <Text size="sm" c="dimmed">
                                {comic.dates?.find(
                                  (d: { type: string; date: string }) =>
                                    d.type === "onsaleDate"
                                )?.date
                                  ? formatDate(
                                      comic.dates.find(
                                        (d: { type: string; date: string }) =>
                                          d.type === "onsaleDate"
                                      )!.date
                                    )
                                  : "Date unknown"}
                              </Text>
                            </Stack>
                          </Group>
                        </Card>
                      </motion.div>
                    ))}
                </SimpleGrid>
              </Stack>
            </Card>
          )}

          {series.length > 0 && (
            <Card
              className="hero-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}>
              <Stack gap="md">
                <Group gap="sm">
                  <Trophy size={24} style={{ color: "var(--marvel-yellow)" }} />
                  <Title
                    order={2}
                    style={{
                      fontFamily: "Marvel, sans-serif",
                      color: "var(--text-primary)",
                    }}>
                    Featured Series
                  </Title>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                  {series
                    .slice(0, 6)
                    .map((serie: MarvelSeries, index: number) => (
                      <motion.div
                        key={serie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}>
                        <Card
                          style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-primary)",
                          }}>
                          <Group gap="sm">
                            <Box
                              style={{
                                width: 60,
                                height: 80,
                                background:
                                  "linear-gradient(135deg, var(--marvel-yellow) 0%, var(--marvel-red) 100%)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}>
                              <Trophy size={24} color="white" />
                            </Box>
                            <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                              <Text
                                fw={600}
                                lineClamp={2}
                                style={{ color: "var(--text-primary)" }}>
                                {serie.title}
                              </Text>
                              <Text size="sm" c="dimmed">
                                {serie.startYear
                                  ? `Started in ${serie.startYear}`
                                  : "Year unknown"}
                              </Text>
                            </Stack>
                          </Group>
                        </Card>
                      </motion.div>
                    ))}
                </SimpleGrid>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </motion.div>
  );
};
