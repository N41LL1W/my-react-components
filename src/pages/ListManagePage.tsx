import React, { useContext, useState, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";

// Tipo base dos itens
interface MyListItem extends BaseListItem {
  nome: string;
  categoria: string;
}

export default function ListManagePage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Estado principal da lista
  const [items, setItems] = useState<MyListItem[]>([
    { id: "1", nome: "Notebook", categoria: "Eletrônicos" },
    { id: "2", nome: "Cadeira", categoria: "Móveis" },
    { id: "3", nome: "Caneca", categoria: "Cozinha" },
  ]);

  // Estado para controle de filtro e edição
  const [filterValue, setFilterValue] = useState("");
  const [editingItem, setEditingItem] = useState<MyListItem | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editCategoria, setEditCategoria] = useState("");

  // Itens filtrados
  const filteredItems = useMemo(() => {
    if (!filterValue) return items;
    return items.filter(
      (item) =>
        item.nome.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.categoria.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [items, filterValue]);

  // Iniciar edição
  const handleEdit = (item: MyListItem) => {
    setEditingItem(item);
    setEditNome(item.nome);
    setEditCategoria(item.categoria);
  };

  // Salvar edição
  const handleSave = () => {
    if (!editingItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? { ...item, nome: editNome, categoria: editCategoria }
          : item
      )
    );

    setEditingItem(null);
    setEditNome("");
    setEditCategoria("");
  };

  // Excluir item
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Clicar em item
  const handleItemClick = (item: MyListItem) => {
    handleEdit(item);
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
        <h1 className="text-3xl font-bold">Gerenciar Itens</h1>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Alternar para modo {theme === "light" ? "escuro 🌙" : "claro ☀️"}
        </button>
      </header>

      {/* Campo de filtro */}
      <div
        className={`mb-8 p-6 rounded-xl shadow-md border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Filtrar Itens</h2>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Digite para filtrar..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
        />
      </div>

      {/* Lista de itens */}
      <section>
        <List<MyListItem>
          title="Itens Cadastrados"
          items={filteredItems}
          renderItem={(item) => (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.nome}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.categoria}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-2 py-1 text-sm rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          )}
          onItemClick={handleItemClick}
          emptyMessage="Nenhum item encontrado."
          filterable
        />
      </section>

      {/* Modal de Edição */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`p-6 rounded-xl w-96 shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Editar Item</h2>

            <div className="space-y-3">
              <input
                type="text"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
                className="w-full p-2 border rounded-md bg-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Nome"
              />
              <input
                type="text"
                value={editCategoria}
                onChange={(e) => setEditCategoria(e.target.value)}
                className="w-full p-2 border rounded-md bg-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Categoria"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
