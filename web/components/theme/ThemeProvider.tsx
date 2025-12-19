"use client";

import { createContext, useContext, useEffect, useState } from "react";
import DarkModeToggle from "./DarkmodeToggle";

const ThemeContext = createContext({
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored) {
      const isDark = stored === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      setDark(isDark);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setDark(prefersDark);
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggle }}>
      <div className="fixed right-6 top-4">
        <DarkModeToggle isDark={dark} />
      </div>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
