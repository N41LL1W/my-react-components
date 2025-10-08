import React, { createContext, useState, useEffect, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextProps {
  theme: Theme;
  effectiveTheme: "light" | "dark"; // ✅ esta propriedade precisa existir
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  effectiveTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getSystemTheme = (): "light" | "dark" =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "system"
  );

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    theme === "system" ? getSystemTheme() : (theme as "light" | "dark")
  );

  useEffect(() => {
    const applyTheme = (themeToApply: "light" | "dark") => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(themeToApply);
    };

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      setEffectiveTheme(systemTheme);
      applyTheme(systemTheme);
    } else {
      setEffectiveTheme(theme);
      applyTheme(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (theme === "system") {
        const systemTheme = media.matches ? "dark" : "light";
        setEffectiveTheme(systemTheme);
        document.documentElement.classList.toggle("dark", media.matches);
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
