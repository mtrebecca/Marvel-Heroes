import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "./index.scss";
import App from "./App.tsx";

const marvelTheme = createTheme({
  primaryColor: "red",
  colors: {
    red: [
      "#ffe0e1",
      "#ffb3b5",
      "#ff8589",
      "#ff565c",
      "#ed1d24",
      "#c41e20",
      "#a01b1c",
      "#7c1518",
      "#580f14",
      "#34090f",
    ],
    blue: [
      "#e6f7ff",
      "#bae7ff",
      "#91d5ff",
      "#69c0ff",
      "#40a9ff",
      "#1890ff",
      "#096dd9",
      "#0050b3",
      "#003a8c",
      "#002766",
    ],
    yellow: [
      "#fff7e6",
      "#ffe7ba",
      "#ffd591",
      "#ffc069",
      "#ffb340",
      "#ffa940",
      "#fa8c16",
      "#d48806",
      "#ad6800",
      "#874d00",
    ],
  },
  fontFamily:
    "Marvel, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  headings: {
    fontFamily:
      "Marvel, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },
  defaultRadius: "md",
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
  },
  other: {
    marvelRed: "#ed1d24",
    marvelBlue: "#0096ff",
    marvelYellow: "#ffc500",
    marvelDark: "#151515",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={marvelTheme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <App />
    </MantineProvider>
  </StrictMode>
);
