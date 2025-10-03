import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import ListCreatePage from "./pages/ListCreatePage";
import ListManagePage from "./pages/ListManagePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-green-600 dark:bg-green-700 text-white p-4 shadow-md">
          <nav className="container mx-auto flex flex-wrap gap-4">
            <Link to="/" className="font-bold hover:underline">Home</Link>
            <Link to="/list" className="hover:underline">Lista</Link>
            <Link to="/create" className="hover:underline">Criar</Link>
            <Link to="/manage" className="hover:underline">Gerenciar</Link>
          </nav>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center h-[70vh]">
                  <h1 className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-4">
                    Tailwind funcionando 🚀
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Use a navegação acima para explorar os exemplos de listas.
                  </p>
                </div>
              }
            />
            <Route path="/list" element={<ListPage />} />
            <Route path="/create" element={<ListCreatePage />} />
            <Route path="/manage" element={<ListManagePage />} />
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 text-center">
          © {new Date().getFullYear()} My React Components
        </footer>
      </div>
    </Router>
  );
}

export default App;
