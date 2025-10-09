import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  });

  // Determina o tema efetivo com base no sistema
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  });

  // Atualiza automaticamente o tema efetivo
  useEffect(() => {
    const updateTheme = () => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

      setEffectiveTheme(isDark ? "dark" : "light");

      // Aplica na raiz do HTML
      document.documentElement.classList.toggle("dark", isDark);
    };

    updateTheme();

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", updateTheme);
      return () => media.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const value: ThemeContextProps = {
    theme,
    effectiveTheme,
    setTheme: (newTheme) => {
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    },
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
