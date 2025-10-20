// Importa hooks do React: useState para estado local e useEffect para efeitos colaterais
import { useState, useEffect } from "react";

export default function Header() {
  // Controle se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado do tema atual: "light", "dark" ou "system"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  // useEffect para aplicar o tema sempre que o estado mudar
  useEffect(() => {
    const root = document.documentElement; // pega o elemento <html>
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // detecta se o sistema prefere escuro

    // Define classe dark no html dependendo do tema
    if (theme === "dark" || (theme === "system" && prefersDark)) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark"); // salva preferência
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]); // executa sempre que o tema mudar

  // Função para alternar tema: light → dark → system → light
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
      {/* Container centralizado e responsivo */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">MyReactComponents</h1>

        {/* Botão mobile para abrir/fechar menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Menu de navegação */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden" // mobile toggle
          } sm:flex sm:items-center gap-6`}
        >
          {/* Links de navegação */}
          <a href="/" className="hover:text-blue-500 transition-colors">
            Home
          </a>
          <a href="/list" className="hover:text-blue-500 transition-colors">
            Listas
          </a>
          <a href="/list/create" className="hover:text-blue-500 transition-colors">
            Criar Lista
          </a>
          <a href="/list/manage" className="hover:text-blue-500 transition-colors">
            Gerenciar
          </a>

          {/* Botão de alternar tema */}
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
