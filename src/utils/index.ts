import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date helper
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Truncate text helper
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Debounce utility
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Theme classes
export const themeClasses = {
  light: {
    bg: "bg-gray-50",
    cardBg: "bg-white",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    border: "border-gray-200",
    hover: "hover:bg-gray-100",
  },
  dark: {
    bg: "bg-gray-900",
    cardBg: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-gray-700",
    hover: "hover:bg-gray-700",
  },
};

// Animation classes
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  bounce: "animate-bounce",
  pulse: "animate-pulse",
  spin: "animate-spin",
};

// Marvel-themed gradient classes
export const marvelGradients = {
  hero: "bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600",
  ironman: "bg-gradient-to-r from-red-500 to-yellow-500",
  captain: "bg-gradient-to-r from-blue-600 to-red-500",
  hulk: "bg-gradient-to-r from-green-500 to-green-700",
  thor: "bg-gradient-to-r from-blue-500 to-purple-600",
  spiderman: "bg-gradient-to-r from-red-600 to-blue-600",
};

// Responsive breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
