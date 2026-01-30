"use client";
import { useTheme } from "./ThemeProvider";

export default function DarkModeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
          isDark
            ? "translate-x-8 bg-gray-500 text-lg"
            : "translate-x-0 bg-white text-xl"
        }`}
      >
        <span>{isDark ? "🌙" : "☀️"}</span>
      </div>
    </button>
  );
}
