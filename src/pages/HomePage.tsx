import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">My React Components</h1>

      <p className="text-lg mb-8 text-center max-w-md">
        Biblioteca de componentes reutilizáveis com suporte a tema claro, escuro e sistema.
      </p>

      <div className="flex gap-4">
        <Link
          to="/list"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Ver Lista
        </Link>
        <Link
          to="/list/create"
          className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Criar Lista
        </Link>
        <Link
          to="/list/manage"
          className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Gerenciar Listas
        </Link>
      </div>

      <div className="mt-10">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
