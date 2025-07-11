import React from "react";
import { Container, Group, Text, Anchor, Stack, Divider } from "@mantine/core";
import { Heart, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: "auto",
        padding: "2rem 0",
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-primary)",
      }}>
      <Container size="lg">
        <Stack gap="md">
          <Divider />

          <Group justify="space-between" align="center" wrap="wrap">
            <Stack gap="xs">
              <Text size="lg" fw={700} className="marvel-text-gradient">
                Marvel Heroes App
              </Text>
              <Text size="sm" c="dimmed">
                Explore o universo Marvel e descubra seus heróis favoritos
              </Text>
            </Stack>

            <Group gap="md">
              <Anchor
                href="https://developer.marvel.com/"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                API Marvel
                <ExternalLink size={14} />
              </Anchor>

              <Anchor
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Github size={14} />
                GitHub
              </Anchor>
            </Group>
          </Group>

          <Group justify="center" gap="xs">
            <Text size="xs" c="dimmed" ta="center">
              © {currentYear} Marvel Heroes App. Feito com
            </Text>
            <Heart size={12} style={{ color: "var(--marvel-red)" }} />
            <Text size="xs" c="dimmed">
              para fãs da Marvel
            </Text>
          </Group>

          <Text
            size="xs"
            c="dimmed"
            ta="center"
            style={{ maxWidth: "600px", margin: "0 auto" }}>
            Os dados fornecidos pela Marvel são © 2024 MARVEL. Todos os direitos
            reservados.
          </Text>
        </Stack>
      </Container>
    </motion.footer>
  );
};
