// ------------------------------------------------------------
// 📄 ListPage.tsx
// ------------------------------------------------------------
// Página para gerenciamento de listas e itens.
// Agora com tooltips integrados para melhorar a usabilidade!
// ------------------------------------------------------------

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { ListForm } from "../../components/lists/ListForm";
import { Tooltip } from "../../components/ui/Tooltip"; // 🆕 import do Tooltip

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

  // ------------------------------------------------------------
  // 🔹 Adiciona nova lista
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

  // ------------------------------------------------------------
  // 🔹 Adiciona item em uma lista específica
  // ------------------------------------------------------------
  const handleAddItemToList = (listId: number, item: Item) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, items: [...list.items, item] } : list
      )
    );

    setActiveListId(null);
    setMessage(`📝 Item "${item.name}" adicionado à lista!`);
  };

  // ------------------------------------------------------------
  // 🔹 Cancela formulários ativos
  // ------------------------------------------------------------
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setActiveListId(null);
  };

  // ------------------------------------------------------------
  // 🔹 Fecha o alerta
  // ------------------------------------------------------------
  const handleCloseAlert = () => setMessage(null);

  // ------------------------------------------------------------
  // 🔹 Renderização principal
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 🔹 Barra de navegação */}
      <Navbar />

      <main className="pt-24 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Gerenciador de Listas e Itens
        </h1>

        {/* ------------------------------------------------------------
          🔸 Alerta de feedback
        ------------------------------------------------------------- */}
        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        {/* ------------------------------------------------------------
          🔸 Botão para criar nova lista com Tooltip
        ------------------------------------------------------------- */}
        {!isFormOpen && activeListId === null && (
          <div className="flex justify-center mb-6">
            <Tooltip content="Crie uma nova lista para organizar seus itens" position="bottom">
              <Button variant="primary" onClick={() => setIsFormOpen(true)}>
                ➕ Criar Nova Lista
              </Button>
            </Tooltip>
          </div>
        )}

        {/* ------------------------------------------------------------
          🔸 Formulário de nova lista
        ------------------------------------------------------------- */}
        {isFormOpen && (
          <div className="flex justify-center">
            <div className="w-1/2">
              <ListForm onSubmit={handleAddList} onCancel={handleCancelForm} />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------
          🔸 Exibe todas as listas criadas
        ------------------------------------------------------------- */}
        <div className="max-w-3xl mx-auto space-y-6 mt-8">
          {lists.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhuma lista criada ainda.
            </p>
          ) : (
            lists.map((list) => (
              <Card
                key={list.id}
                title={list.name}
                footer={
                  <div className="flex justify-end space-x-2">
                    {/* Tooltip aplicado sobre o botão de adicionar item */}
                    <Tooltip content="Adicionar novo item a esta lista" position="top">
                      <Button
                        variant="primary"
                        onClick={() => setActiveListId(list.id)}
                      >
                        ➕ Adicionar Item
                      </Button>
                    </Tooltip>
                  </div>
                }
              >
                {/* Descrição da lista */}
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  {list.description || "Sem descrição."}
                </p>

                {/* Itens dentro da lista */}
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

                {/* Formulário de item dentro da lista */}
                {activeListId === list.id && (
                  <div className="mt-4">
                    <ListForm
                      onSubmit={(item) => handleAddItemToList(list.id, item)}
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
