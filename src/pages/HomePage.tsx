import DarkModeToggle from "../components/ui/DarkModeToggle";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                    transition-colors duration-300 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🌗 Alternar Tema com Modo do Sistema
      </h1>

      <p className="text-lg mb-8 text-center max-w-md">
        Altere o tema manualmente ou use a opção de seguir o modo do sistema.
      </p>

      <DarkModeToggle />

      <footer className="mt-12 text-sm opacity-70">
        Feito com ❤️ usando React + Tailwind CSS v4
      </footer>
    </div>
  );
}
