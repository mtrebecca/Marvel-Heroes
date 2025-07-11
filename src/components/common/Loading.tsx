import React from "react";
import { Loader, Center, Stack, Text } from "@mantine/core";

interface LoadingProps {
  size?: number;
  message?: string;
  centered?: boolean;
  minHeight?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 48,
  message = "Carregando heróis...",
  centered = true,
  minHeight = "60vh",
}) => {
  const content = (
    <Stack align="center" gap="md">
      <Loader size={size} color="red" type="dots" />
      {message && (
        <Text size="sm" c="dimmed">
          {message}
        </Text>
      )}
    </Stack>
  );

  if (centered) {
    return <Center style={{ minHeight }}>{content}</Center>;
  }

  return content;
};
