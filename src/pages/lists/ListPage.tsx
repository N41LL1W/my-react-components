// src/pages/lists/ListPage.tsx
import { useState } from "react";
import Navbar from "../../components/layout/Navbar"; // ✅ Usa Navbar unificado
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { ListForm } from "../../components/lists/ListForm";
import { Dropdown } from "../../components/ui/DropDown";

// ------------------------------------------------------------
// 🔹 Tipos de dados usados
// ------------------------------------------------------------
interface Item {
  name: string;
  description: string;
}

interface List {
  id: number;
  name: string;
  description: string;
  items: Item[];
}

export default function ListPage() {
  // ------------------------------------------------------------
  // 🔸 Estados principais
  // ------------------------------------------------------------
  const [lists, setLists] = useState<List[]>([]);
  const [activeListId, setActiveListId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todas");

  // ------------------------------------------------------------
  // 🔹 Funções de manipulação
  // ------------------------------------------------------------
  const handleAddList = (data: { name: string; description: string }) => {
    const newList: List = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      items: [],
    };
    setLists((prev) => [...prev, newList]);
    setIsFormOpen(false);
    setMessage(`✅ Lista "${data.name}" criada com sucesso!`);
  };

  const handleAddItemToList = (listId: number, item: Item) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: [...list.items, item] }
          : list
      )
    );
    setActiveListId(null);
    setMessage(`📝 Item "${item.name}" adicionado à lista!`);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setActiveListId(null);
  };

  const handleCloseAlert = () => {
    setMessage(null);
  };

  // ------------------------------------------------------------
  // 🔹 Lista filtrada com base no dropdown
  // ------------------------------------------------------------
  const filteredLists =
    filter === "Todas"
      ? lists
      : lists.filter((list) => list.name.includes(filter));

  const filterOptions = ["Todas", ...lists.map((list) => list.name)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 🔹 Navbar unificado */}
      <Navbar />

      {/* 🔹 Conteúdo principal */}
      <main className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Gerenciador de Listas e Itens
        </h1>

        {/* Alerta de feedback */}
        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        {/* Dropdown de filtro de listas */}
        <div className="max-w-xs mx-auto mb-6">
          <Dropdown
            label={`Filtro: ${filter}`}
            options={filterOptions}
            onSelect={(value) => setFilter(value)}
            fullWidth
          />
        </div>

        {/* Botão para criar nova lista */}
        {!isFormOpen && activeListId === null && (
          <div className="flex justify-center mb-6">
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              ➕ Criar Nova Lista
            </Button>
          </div>
        )}

        {/* Formulário de nova lista */}
        {isFormOpen && (
          <ListForm onSubmit={handleAddList} onCancel={handleCancelForm} />
        )}

        {/* Listas filtradas */}
        <div className="max-w-3xl mx-auto space-y-6 mt-8">
          {filteredLists.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhuma lista encontrada.
            </p>
          ) : (
            filteredLists.map((list) => (
              <Card
                key={list.id}
                title={list.name}
                footer={
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="primary"
                      onClick={() => setActiveListId(list.id)}
                    >
                      ➕ Adicionar Item
                    </Button>
                  </div>
                }
              >
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  {list.description || "Sem descrição."}
                </p>

                {list.items.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum item ainda.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {list.items.map((item, index) => (
                      <li key={index} className="pl-2">
                        <strong>{item.name}</strong> — {item.description}
                      </li>
                    ))}
                  </ul>
                )}

                {activeListId === list.id && (
                  <div className="mt-4">
                    <ListForm
                      onSubmit={(item) =>
                        handleAddItemToList(list.id, item)
                      }
                      onCancel={handleCancelForm}
                    />
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
