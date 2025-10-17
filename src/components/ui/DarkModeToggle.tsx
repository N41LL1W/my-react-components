import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (themeValue: "light" | "dark" | "system") => {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const finalTheme = themeValue === "system" ? (isSystemDark ? "dark" : "light") : themeValue;

      if (finalTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    // atualiza automaticamente se o tema do sistema mudar
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    localStorage.setItem("theme", theme);

    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`px-4 py-2 rounded-md ${
            theme === "light"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          }`}
        >
          ☀️ Claro
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`px-4 py-2 rounded-md ${
            theme === "dark"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          }`}
        >
          🌙 Escuro
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`px-4 py-2 rounded-md ${
            theme === "system"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          }`}
        >
          💻 Sistema
        </button>
      </div>

      <p className="text-sm opacity-70">
        Tema atual: <span className="font-semibold">{theme}</span>
      </p>
    </div>
  );
};

export default DarkModeToggle;
