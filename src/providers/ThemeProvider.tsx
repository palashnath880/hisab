/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Theme, ThemeProviderContext } from "@/hooks/use-theme";
import { useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

/**
 * Theme Provider
 * @param param0
 * @returns
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "hisab-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    // get theme
    const getTheme = localStorage.getItem(storageKey) as Theme;

    if (!getTheme) {
      const myTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(myTheme);
      setTheme(myTheme);
    } else {
      root.classList.add(getTheme);
      setTheme(getTheme);
    }
  }, [theme, defaultTheme, storageKey]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
