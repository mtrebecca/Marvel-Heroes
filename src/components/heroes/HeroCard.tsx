import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Image, Stack, Group, ActionIcon } from "@mantine/core";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { MarvelCharacter } from "../../types";
import { useFavorites } from "../../hooks";

interface HeroCardProps {
  hero: MarvelCharacter;
  className?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, className }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const imageUrl =
    hero.thumbnail && hero.thumbnail.path && hero.thumbnail.extension
      ? `${hero.thumbnail.path}.${hero.thumbnail.extension}`
      : undefined;

  const handleCardClick = () => {
    navigate(`/hero/${hero.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(hero);
  };

  const isHeroFavorite = isFavorite(hero.id);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}>
      <Card
        className={className}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          cursor: "pointer",
          height: "100%",
          position: "relative",
        }}
        onClick={handleCardClick}>
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
              variant={isHeroFavorite ? "filled" : "subtle"}
              color="red"
              size="md"
              onClick={handleFavoriteClick}
              style={{
                flexShrink: 0,
                zIndex: 1,
              }}>
              <Heart
                size={16}
                fill={isHeroFavorite ? "currentColor" : "none"}
              />
            </ActionIcon>
          </Group>

          <Text
            size="sm"
            c="dimmed"
            style={{
              flex: 1,
              minHeight: "60px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}>
            {hero.description || "Nenhuma descrição disponível."}
          </Text>

          <Text size="xs" mt="auto">
            Quadrinhos: {hero.comics?.available ?? 0} | Séries:{" "}
            {hero.series?.available ?? 0} | Eventos:{" "}
            {hero.events?.available ?? 0}
          </Text>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default HeroCard;
