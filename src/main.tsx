// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa as páginas
import App from "./App";
import ListPage from "./pages/lists/ListPage";

// Importa o CSS global
import "./index.css";

// 🔹 Cria o ponto de entrada do app e adiciona o roteador
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<App />} />

        {/* Página de listas */}
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
