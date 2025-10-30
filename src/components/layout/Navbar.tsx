// ------------------------------------------------------------
// 📄 Navbar.tsx — Navegação principal unificada e funcional
// ------------------------------------------------------------
// 🔹 Corrige o link "Listas" para apontar para /list (rota existente).
// 🔹 Usa React Router Link para evitar recarregar a página.
// 🔹 Mantém alternância de tema e design responsivo.
// ------------------------------------------------------------

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  // Estado do menu mobile (aberto ou fechado)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado do tema atual: "light", "dark" ou "system"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  // Hook para saber qual rota está ativa no momento
  const location = useLocation();

  // ------------------------------------------------------------
  // 🎨 Aplica o tema (escuro, claro, sistema) no HTML
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // 🔄 Alterna o tema em loop: claro → escuro → sistema
  // ------------------------------------------------------------
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  // ------------------------------------------------------------
  // 🧭 Define o estilo do link ativo (rota atual)
  // ------------------------------------------------------------
  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "hover:text-blue-500 transition-colors";

  // ------------------------------------------------------------
  // 💠 Renderização da Navbar
  // ------------------------------------------------------------
  return (
    <header className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md fixed top-0 left-0 z-50">
      {/* Container principal centralizado */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* 🔹 Logo do app */}
        <h1 className="text-xl font-bold tracking-wide">MyReactComponents</h1>

        {/* 🔹 Botão do menu mobile (hambúrguer) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* 🔹 Links de navegação */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex sm:items-center gap-6`}
        >
          {/* Home */}
          <Link to="/" className={isActive("/")}>
            Home
          </Link>

          {/* 🔹 Corrigido: agora aponta para /list (rota existente) */}
          <Link to="/list" className={isActive("/list")}>
            Listas
          </Link>

          {/* 🔹 Botão para alternar o tema */}
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
