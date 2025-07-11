import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SimpleGrid,
  Stack,
  Title,
  Text,
  Center,
  Alert,
  Group,
  Select,
} from "@mantine/core";
import { AlertCircle, Users, ArrowUpDown } from "lucide-react";
import { SearchBar } from "../common/SearchBar";
import { Pagination } from "../common/Pagination";
import { Loading } from "../common/Loading";
import { useHeroes, useViewMode } from "../../hooks";
import { useLocalSearch } from "../../hooks/useLocalSearch";
import HeroCard from "./HeroCard";

export const HeroList: React.FC = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );

  const { heroes, loading, error, pagination, fetchHeroes, resetFilters } =
    useHeroes();

  const { viewMode } = useViewMode();

  const searchedHeroes = useLocalSearch(heroes, localSearchTerm);

  const filteredHeroes = useMemo(() => {
    if (sortOrder === "default") {
      return searchedHeroes;
    }

    return [...searchedHeroes].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name, "pt-BR");
      } else {
        return b.name.localeCompare(a.name, "pt-BR");
      }
    });
  }, [searchedHeroes, sortOrder]);

  useEffect(() => {
    if (heroes.length === 0 && !loading && !error) {
      fetchHeroes(1);
    }
  }, [heroes.length, loading, error, fetchHeroes]);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
  };

  const handleSearchClear = () => {
    setLocalSearchTerm("");
    resetFilters();
  };

  const handlePageChange = (page: number) => {
    fetchHeroes(page);
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

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}>
        <Center style={{ minHeight: "50vh" }}>
          <Alert
            icon={<AlertCircle size={20} />}
            title="Oops! Something went wrong"
            color="red"
            style={{ maxWidth: 400 }}>
            <Text size="sm" mb="md">
              {error}
            </Text>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => fetchHeroes(1)}
                className="marvel-button"
                style={{ marginTop: "12px" }}>
                Try Again
              </button>
            </motion.div>
          </Alert>
        </Center>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Stack gap="xl" style={{ padding: "24px 0 4rem 0" }}>
        {/* Hero Header */}
        <motion.div variants={itemVariants}>
          <Center>
            <Stack align="center" gap="md">
              <Group gap="sm">
                <Users size={28} style={{ color: "var(--marvel-red)" }} />
                <Title
                  order={1}
                  className="marvel-text-gradient"
                  style={{
                    fontFamily: "Marvel, sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                  }}>
                  Heróis Marvel
                </Title>
              </Group>
              <Text size="lg" c="dimmed" ta="center" style={{ maxWidth: 600 }}>
                Descubra os heróis mais poderosos do Universo Marvel
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
                <Users size={16} />
                {pagination.totalItems} heróis disponíveis
              </Text>
            </Stack>
          </Center>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SearchBar
            placeholder="Buscar heróis por nome..."
            onSearch={handleSearchChange}
            onClear={handleSearchClear}
            searchTerm={localSearchTerm}
          />
        </motion.div>

        {/* Controles de Ordenação */}
        <motion.div variants={itemVariants}>
          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              {filteredHeroes.length}{" "}
              {filteredHeroes.length === 1
                ? "herói encontrado"
                : "heróis encontrados"}
            </Text>

            <Group gap="sm">
              <ArrowUpDown size={16} style={{ color: "var(--marvel-red)" }} />
              <Select
                placeholder="Ordenar por"
                value={sortOrder}
                onChange={(value) =>
                  setSortOrder(value as "asc" | "desc" | "default")
                }
                data={[
                  { value: "default", label: "Ordem padrão" },
                  { value: "asc", label: "A - Z" },
                  { value: "desc", label: "Z - A" },
                ]}
                size="sm"
                style={{ minWidth: 140 }}
                styles={{
                  input: {
                    borderColor: "var(--marvel-red)",
                    "&:focus": {
                      borderColor: "var(--marvel-red)",
                    },
                  },
                }}
              />
            </Group>
          </Group>
        </motion.div>

        <motion.div variants={itemVariants}>
          {loading ? (
            <Loading />
          ) : filteredHeroes.length > 0 ? (
            viewMode === "grid" ? (
              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing="md"
                className="marvel-grid">
                <AnimatePresence mode="popLayout">
                  {filteredHeroes.map((hero, index) => (
                    <motion.div
                      key={hero.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100,
                      }}>
                      <HeroCard hero={hero} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SimpleGrid>
            ) : (
              <Stack gap="md" className="marvel-list">
                <AnimatePresence mode="popLayout">
                  {filteredHeroes.map((hero, index) => (
                    <motion.div
                      key={hero.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}>
                      <HeroCard hero={hero} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Stack>
            )
          ) : (
            <Center style={{ minHeight: "30vh" }}>
              <Stack align="center" gap="md">
                <Users size={48} style={{ color: "var(--text-tertiary)" }} />
                <Title order={3} c="dimmed">
                  Nenhum herói encontrado
                </Title>
                <Text size="sm" c="dimmed" ta="center">
                  Tente ajustar sua busca ou filtros
                </Text>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handleSearchClear}
                    className="marvel-button-secondary">
                    Limpar Filtros
                  </button>
                </motion.div>
              </Stack>
            </Center>
          )}
        </motion.div>
        {heroes.length > 0 && !localSearchTerm && (
          <motion.div variants={itemVariants}>
            <Center>
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
              />
            </Center>
          </motion.div>
        )}

        {localSearchTerm && (
          <motion.div variants={itemVariants}>
            <Center>
              <Text size="sm" c="dimmed">
                {filteredHeroes.length} de {heroes.length} heróis encontrados
                para "{localSearchTerm}"
              </Text>
            </Center>
          </motion.div>
        )}
      </Stack>
    </motion.div>
  );
};

export default HeroList;
