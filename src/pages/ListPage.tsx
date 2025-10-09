// src/pages/ListPage.tsx
import { useState } from "react";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";
import { useTheme } from "../context/ThemeContext";

// Tipo do item da lista
export interface MyListItem extends BaseListItem {
  name: string;
}

export default function ListPage() {
  const { theme, toggleTheme } = useTheme();

  const [items, setItems] = useState<MyListItem[]>([
    { id: "1", name: "Item A" },
    { id: "2", name: "Item B" },
    { id: "3", name: "Item C" },
  ]);

  const [filterValue, setFilterValue] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<keyof MyListItem>("name");

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
      <h1 className="text-3xl font-bold mb-6">Minha Lista</h1>

      <List
        title="Itens"
        items={sortedItems}
        renderItem={(item) => <span>{item.name}</span>}
        onItemClick={handleItemClick}
        emptyMessage="Nenhum item disponível."
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
