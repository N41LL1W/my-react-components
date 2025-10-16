import type { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const nextTheme: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
    >
      Tema atual: {theme} (clique para mudar)
    </button>
  );
};
