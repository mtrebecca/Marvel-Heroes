import React from "react";
import { Pagination as MantinePagination, Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className,
}) => {
  const startItem =
    totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem =
    totalItems && itemsPerPage
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : null;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}>
      <Stack align="center" gap="sm">
        <MantinePagination
          value={currentPage}
          total={totalPages}
          onChange={onPageChange}
          size="md"
          radius="md"
          withEdges
          siblings={1}
          boundaries={1}
          styles={{
            control: {
              border: "1px solid var(--border-primary)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-primary)",
              "&:hover": {
                backgroundColor: "var(--marvel-red)",
                borderColor: "var(--marvel-red)",
                color: "white",
              },
              '&[dataActive="true"]': {
                backgroundColor: "var(--marvel-red)",
                borderColor: "var(--marvel-red)",
                color: "white",
              },
            },
          }}
        />

        {totalItems && itemsPerPage && (
          <Text size="sm" c="dimmed">
            Showing {startItem} to {endItem} of {totalItems} heroes
          </Text>
        )}
      </Stack>
    </motion.div>
  );
};
