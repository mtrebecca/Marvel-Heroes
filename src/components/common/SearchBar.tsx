import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextInput, ActionIcon, Box } from "@mantine/core";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onClear?: () => void;
  searchTerm?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar heróis...",
  onSearch,
  onClear,
  searchTerm = "",
  className,
}) => {
  const [value, setValue] = useState(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}>
      <Box
        className="marvel-search"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}>
        <TextInput
          size="md"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          leftSection={
            <Search size={18} style={{ color: "var(--text-secondary)" }} />
          }
          rightSection={
            value && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={handleClear}
                  style={{ color: "var(--text-secondary)" }}>
                  <X size={16} />
                </ActionIcon>
              </motion.div>
            )
          }
          styles={{
            input: {
              backgroundColor: "var(--bg-card)",
              border: "2px solid var(--border-primary)",
              borderRadius: "20px",
              padding: "16px 24px 16px 56px",
              fontSize: "16px",
              fontFamily: "Marvel, sans-serif",
              color: "var(--text-primary)",
              transition: "all var(--transition-normal)",
              "&:focus": {
                borderColor: "var(--marvel-red)",
                boxShadow: "0 0 0 3px rgba(237, 29, 36, 0.1)",
              },
              "&::placeholder": {
                color: "var(--text-tertiary)",
              },
            },
            section: {
              color: "var(--text-secondary)",
            },
          }}
        />
      </Box>
    </motion.div>
  );
};
