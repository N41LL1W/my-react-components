// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 🔹 Importa Link para navegação SPA

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  // 🔹 Efeito: aplica o tema conforme a preferência
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (theme === "system" && prefersDark)) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 🔹 Alterna entre temas (claro / escuro / sistema)
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* 🔹 Logo / título */}
        <h1 className="text-xl font-bold tracking-wide">MyReactComponents</h1>

        {/* 🔹 Botão mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* 🔹 Menu de navegação */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex sm:items-center gap-6`}
        >
          {/* Links com React Router */}
          <Link
            to="/"
            className="hover:text-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/list"
            className="hover:text-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Listas
          </Link>

          {/* 🔹 Botão de alternância de tema */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-800 text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {theme === "light"
              ? "🌞 Claro"
              : theme === "dark"
              ? "🌙 Escuro"
              : "🖥️ Sistema"}
          </button>
        </nav>
      </div>
    </header>
  );
}
