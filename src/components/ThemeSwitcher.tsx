import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme, effectiveTheme } = useContext(ThemeContext);

  const nextLabel =
    theme === "light"
      ? "Mudar para escuro 🌙"
      : theme === "dark"
      ? "Seguir sistema ⚙️"
      : "Mudar para claro ☀️";

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow ${
        effectiveTheme === "dark"
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
      }`}
    >
      {nextLabel}
    </button>
  );
};

export default ThemeSwitcher;
