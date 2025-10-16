import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";


export type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");

  // Atualiza a classe dark no html
  useEffect(() => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const newEffective = theme === "system" ? (systemDark ? "dark" : "light") : theme;
    setEffectiveTheme(newEffective);
    document.documentElement.classList.toggle("dark", newEffective === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
