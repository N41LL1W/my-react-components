// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";

import ListPage from "./pages/ListPage";
import ListCreatePage from "./pages/ListCreatePage";
import ListManagePage from "./pages/ListManagePage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* Header fixo */}
          <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
            <h1 className="text-xl font-bold">My React Components</h1>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/list" className="hover:underline">
                Listas
              </Link>
              <Link to="/list/create" className="hover:underline">
                Criar Lista
              </Link>
              <Link to="/list/manage" className="hover:underline">
                Gerenciar
              </Link>
              <ThemeSwitcher />
            </div>
          </header>

          {/* Conteúdo principal */}
          <main className="p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                    <h2 className="text-4xl font-bold mb-4">
                      Bem-vindo 🚀
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                      Explore, crie e gerencie suas listas com estilo!
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/list"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      >
                        Ver Listas
                      </Link>
                      <Link
                        to="/list/create"
                        className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                      >
                        Criar Nova Lista
                      </Link>
                    </div>
                  </div>
                }
              />
              <Route path="/list" element={<ListPage />} />
              <Route path="/list/create" element={<ListCreatePage />} />
              <Route path="/list/manage" element={<ListManagePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
