// src/App.tsx
import DarkModeToggle from "./components/ui/DarkModeToggle";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">🌗 Modo Escuro com Tailwind v4</h1>
      <DarkModeToggle />
      <p className="mt-6 text-center max-w-md">
        Este é um exemplo funcional de alternância de tema no React + Tailwind v4.
      </p>
    </div>
  );
}
