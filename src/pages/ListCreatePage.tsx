import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";

// Tipo dos itens
interface MyListItem extends BaseListItem {
  nome: string;
  categoria: string;
}

export default function ListCreatePage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Estado para os itens e campos do formulário
  const [items, setItems] = useState<MyListItem[]>([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  // Função para adicionar item
  const handleAddItem = () => {
    if (!nome.trim() || !categoria.trim()) {
      alert("Preencha todos os campos antes de adicionar um item.");
      return;
    }

    const newItem: MyListItem = {
      id: String(Date.now()),
      nome,
      categoria,
    };

    setItems((prev) => [...prev, newItem]);
    setNome("");
    setCategoria("");
  };

  // Ação ao clicar em um item
  const handleItemClick = (item: MyListItem) => {
    alert(`Item selecionado: ${item.nome}`);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Criar Lista</h1>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Alternar para modo {theme === "light" ? "escuro 🌙" : "claro ☀️"}
        </button>
      </header>

      {/* Formulário de criação */}
      <section
        className={`mb-8 p-6 rounded-xl shadow-md border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Adicionar novo item</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do item"
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          />
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Categoria"
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md px-4 py-2 transition"
          >
            Adicionar
          </button>
        </div>
      </section>

      {/* Lista de pré-visualização */}
      <section>
        <List<MyListItem>
          title="Itens adicionados"
          items={items}
          renderItem={(item) => (
            <div>
              <p className="font-semibold">{item.nome}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.categoria}
              </p>
            </div>
          )}
          onItemClick={handleItemClick}
          emptyMessage="Nenhum item adicionado ainda."
          filterable
        />
      </section>
    </div>
  );
}
