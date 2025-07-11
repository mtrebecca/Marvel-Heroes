import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Group, Box, Text, useMantineColorScheme } from "@mantine/core";
import { Shield, Sparkles } from "lucide-react";
import { ModernNavigation } from "./ModernNavigation";

export const Header: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        height: "80px",
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid var(--border-primary)`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}>
      <Group
        justify="space-between"
        style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Modern Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Group gap="md">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: "relative" }}>
              {/* Main Logo Circle */}
              <Box
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, var(--marvel-red) 0%, var(--marvel-red-dark) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(237, 29, 36, 0.3)",
                }}>
                <Shield size={24} color="white" />
              </Box>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                }}>
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    background:
                      "linear-gradient(135deg, var(--marvel-yellow) 0%, var(--marvel-yellow-dark) 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Sparkles size={8} color="white" />
                </Box>
              </motion.div>

              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, var(--marvel-red) 0%, var(--marvel-red-dark) 100%)",
                  filter: "blur(20px)",
                  opacity: 0.3,
                  zIndex: -1,
                }}
              />
            </motion.div>

            <Box visibleFrom="sm">
              <motion.div>
                <Text
                  size="xl"
                  fw={700}
                  className="marvel-text-gradient"
                  style={{ lineHeight: 1.2 }}>
                  Heróis da Marvel
                </Text>
                <Text
                  size="sm"
                  c="dimmed"
                  style={{
                    color: "var(--text-secondary)",
                    transition: "color var(--transition-normal)",
                  }}>
                  Descubra seus heróis
                </Text>
              </motion.div>
            </Box>
          </Group>
        </Link>
        <ModernNavigation />
      </Group>
    </motion.header>
  );
};
