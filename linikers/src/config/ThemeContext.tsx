"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "@mui/material/styles";
import { themes, defaultThemeId, getThemeById, ThemeMeta } from "@/config/themes";

interface ThemeContextValue {
  currentThemeId: string;
  currentTheme: Theme;
  setTheme: (id: string) => void;
  cycleTheme: () => void;
  themeCount: number;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentThemeId, setCurrentThemeId] = useState(defaultThemeId);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && themes.some((t: ThemeMeta) => t.id === saved)) {
      setCurrentThemeId(saved);
    }
  }, []);

  const setTheme = useCallback((id: string) => {
    setCurrentThemeId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const cycleTheme = useCallback(() => {
    setCurrentThemeId((prev: string) => {
      const idx = themes.findIndex((t: ThemeMeta) => t.id === prev);
      const next = themes[(idx + 1) % themes.length];
      localStorage.setItem(STORAGE_KEY, next.id);
      return next.id;
    });
  }, []);

  const currentTheme = getThemeById(currentThemeId);

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        currentTheme,
        setTheme,
        cycleTheme,
        themeCount: themes.length,
      }}
    >
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
