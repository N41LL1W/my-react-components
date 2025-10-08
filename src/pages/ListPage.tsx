import React, { useContext, useState, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";

// Define a estrutura de cada item
interface MyListItem extends BaseListItem {
  nome: string;
  categoria: string;
}

// Dados de exemplo
const mockData: MyListItem[] = [
  { id: "1", nome: "Computador", categoria: "Eletrônicos" },
  { id: "2", nome: "Caderno", categoria: "Papelaria" },
  { id: "3", nome: "Mesa", categoria: "Móveis" },
  { id: "4", nome: "Caneta", categoria: "Papelaria" },
  { id: "5", nome: "Mouse", categoria: "Eletrônicos" },
];

export default function ListPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Estado para filtro e ordenação
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<keyof MyListItem>("nome");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtro e ordenação otimizados com useMemo
  const filteredItems = useMemo(() => {
    let result = [...mockData];

    if (filterValue) {
      result = result.filter(
        (item) =>
          item.nome.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.categoria.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const valA = String(a[sortBy]).toLowerCase();
      const valB = String(b[sortBy]).toLowerCase();

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [filterValue, sortBy, sortDirection]);

  // Manipuladores
  const handleSort = (key: keyof MyListItem, direction: "asc" | "desc") => {
    setSortBy(key);
    setSortDirection(direction);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const handleItemClick = (item: MyListItem) => {
    alert(`Você clicou em: ${item.nome}`);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Lista de Itens</h1>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Alternar para modo {theme === "light" ? "escuro 🌙" : "claro ☀️"}
        </button>
      </header>

      {/* Lista */}
      <List<MyListItem>
        title="Itens disponíveis"
        items={filteredItems}
        renderItem={(item) => (
          <div>
            <p className="font-semibold">{item.nome}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.categoria}</p>
          </div>
        )}
        onItemClick={handleItemClick}
        sortable
        onSort={handleSort}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
        filterable
        onFilterChange={handleFilterChange}
        currentFilterValue={filterValue}
      />
    </div>
  );
}
