"use client";
import { useTheme } from "./ThemeProvider";

export default function DarkModeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
    >
      Toggle Theme
    </button>
  );
}
