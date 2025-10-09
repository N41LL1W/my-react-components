import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme, toggleTheme, effectiveTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Alternar Tema
      </button>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Modo:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as typeof theme)}
          className="border p-1 rounded-md bg-gray-100 dark:bg-gray-800"
        >
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
          <option value="system">Sistema</option>
        </select>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        Tema atual: <strong>{effectiveTheme}</strong>
      </p>
    </div>
  );
}
