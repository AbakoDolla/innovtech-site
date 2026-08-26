import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookieConsent } from "./CookieConsentContext";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function resolveInitialTheme({
  defaultTheme,
  switchable,
  search,
  storedTheme,
}: {
  defaultTheme: Theme;
  switchable: boolean;
  search: string;
  storedTheme: string | null;
}): Theme {
  if (!switchable) return defaultTheme;

  const requestedTheme = new URLSearchParams(search).get("theme");
  if (requestedTheme === "light" || requestedTheme === "dark") return requestedTheme;
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  return defaultTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const { consent } = useCookieConsent();
  const [theme, setTheme] = useState<Theme>(() =>
    resolveInitialTheme({
      defaultTheme,
      switchable,
      search: window.location.search,
      storedTheme: consent?.preferences ? localStorage.getItem("theme") : null,
    }),
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable && consent?.preferences) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme, switchable, consent?.preferences]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
