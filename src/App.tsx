import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ui/ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <h1 className="text-3xl font-bold mb-6">🌗 Tema Global Funcionando</h1>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
