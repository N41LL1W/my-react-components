// Importações essenciais
import { useState, useEffect } from "react";
// Ícones do pacote lucide-react (menu hambúrguer e botão de fechar)
import { Menu, X } from "lucide-react";
// Importa o botão de alternância de tema que você já tem
import DarkModeToggle from "../ui/DarkModeToggle";
// Importa componentes do Framer Motion para animações
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // Estado que controla se o menu mobile está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado que verifica se o usuário rolou a página (para mudar a aparência da navbar)
  const [scrolled, setScrolled] = useState(false);

  // Efeito que monitora o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Se o scrollY for maior que 10px, ativa o estado "scrolled"
    };
    window.addEventListener("scroll", handleScroll);

    // Limpa o evento quando o componente é desmontado
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Navbar fixa no topo com efeito de transição entre transparente e sólida
    <motion.nav
      // Framer Motion faz a navbar "surgir" suavemente no carregamento
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // Tailwind classes para estilo base e mudanças ao rolar
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Container interno da navbar */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo ou título da aplicação */}
        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 select-none">
          MeuApp
        </div>

        {/* Menu visível apenas em telas médias ou maiores */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Links de navegação */}
          <a
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Início
          </a>
          <a
            href="/list"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Listas
          </a>
          <a
            href="/about"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Sobre
          </a>

          {/* Botão de alternância de tema (claro/escuro/sistema) */}
          <DarkModeToggle />
        </div>

        {/* Botão que aparece apenas em telas pequenas (menu hambúrguer) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)} // Alterna o estado do menu
          className="md:hidden text-gray-800 dark:text-gray-100"
          aria-label="Menu"
        >
          {/* Ícone muda conforme o estado do menu */}
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu MOBILE — aparece com animação suave quando aberto */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            // Animações de entrada e saída
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {/* Cada link fecha o menu ao ser clicado */}
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Início
              </a>
              <a
                href="/list"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Listas
              </a>
              <a
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                Sobre
              </a>

              {/* Alternância de tema também disponível no mobile */}
              <DarkModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
