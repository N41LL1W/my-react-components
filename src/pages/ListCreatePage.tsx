// src/pages/ListCreatePage.tsx
import { useState } from "react";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";
import { useTheme } from "../context/ThemeContext";

// Definição do tipo de item da lista
export interface MyListItem extends BaseListItem {
  name: string;
}

export default function ListCreatePage() {
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState<MyListItem[]>([]);
  const [newName, setNewName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<keyof MyListItem>("name");

  // Adiciona um novo item
  const handleAddItem = () => {
    if (!newName.trim()) return;
    const newItem: MyListItem = {
      id: Date.now().toString(), // ID como string
      name: newName.trim(),
    };
    setItems([...items, newItem]);
    setNewName("");
  };

  // Lida com clique no item
  const handleItemClick = (item: MyListItem) => {
    alert(`Você clicou em: ${item.name}`);
  };

  // Filtra itens
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Ordena itens
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Criar Lista</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Novo item"
          className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Adicionar
        </button>
      </div>

      <List
        title="Minha Lista"
        items={sortedItems}
        renderItem={(item) => <span>{item.name}</span>}
        onItemClick={handleItemClick}
        emptyMessage="Nenhum item adicionado."
        filterable
        onFilterChange={setFilterValue}
        currentFilterValue={filterValue}
        sortable
        onSort={(key, dir) => {
          setSortBy(key);
          setSortDirection(dir);
        }}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
      />

      <div className="mt-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Alternar Tema (Atual: {theme})
        </button>
      </div>
    </div>
  );
}
