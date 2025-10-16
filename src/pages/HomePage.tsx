import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 gap-6">
      <h1 className="text-4xl font-bold">🌗 Tema Global Funcionando</h1>
      <ThemeToggle />
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
    </div>
  );
}
