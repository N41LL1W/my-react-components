// ------------------------------------------------------------
// 📄 ListPage.tsx
// ------------------------------------------------------------
// Agora com suporte completo para CRUD (Create, Read, Update, Delete)
// de listas e itens dentro do mesmo componente.
// ------------------------------------------------------------

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { ListForm } from "../../components/lists/ListForm";

// ------------------------------------------------------------
// 🔹 Tipos de dados
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

// ------------------------------------------------------------
// 🔸 Componente principal
// ------------------------------------------------------------
export default function ListPage() {
  // Estado com todas as listas criadas
  const [lists, setLists] = useState<List[]>([]);

  // Controla qual lista está ativa (para adicionar item)
  const [activeListId, setActiveListId] = useState<number | null>(null);

  // Controla qual lista está sendo editada
  const [editingListId, setEditingListId] = useState<number | null>(null);

  // Controla qual item está sendo editado (índice dentro da lista)
  const [editingItemIndex, setEditingItemIndex] = useState<{
    listId: number;
    index: number;
  } | null>(null);

  // Exibição do formulário principal
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Mensagem de feedback (usada nos Alerts)
  const [message, setMessage] = useState<string | null>(null);

  // ------------------------------------------------------------
  // 🟢 Criar nova lista
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
  // ✏️ Editar lista existente
  // ------------------------------------------------------------
  const handleEditList = (data: { name: string; description: string }) => {
    if (editingListId === null) return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === editingListId
          ? { ...list, name: data.name, description: data.description }
          : list
      )
    );

    setEditingListId(null);
    setMessage(`✏️ Lista atualizada com sucesso!`);
  };

  // ------------------------------------------------------------
  // ❌ Excluir lista
  // ------------------------------------------------------------
  const handleDeleteList = (id: number) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    setMessage(`🗑️ Lista removida!`);
  };

  // ------------------------------------------------------------
  // 🟢 Adicionar item dentro de uma lista
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // ✏️ Editar item dentro da lista
  // ------------------------------------------------------------
  const handleEditItem = (data: { name: string; description: string }) => {
    if (!editingItemIndex) return;

    const { listId, index } = editingItemIndex;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item, i) =>
                i === index ? { name: data.name, description: data.description } : item
              ),
            }
          : list
      )
    );

    setEditingItemIndex(null);
    setMessage(`✏️ Item atualizado com sucesso!`);
  };

  // ------------------------------------------------------------
  // ❌ Excluir item dentro da lista
  // ------------------------------------------------------------
  const handleDeleteItem = (listId: number, index: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((_, i) => i !== index) }
          : list
      )
    );

    setMessage(`🗑️ Item removido da lista.`);
  };

  // ------------------------------------------------------------
  // ⚙️ Utilitários
  // ------------------------------------------------------------
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setActiveListId(null);
    setEditingListId(null);
    setEditingItemIndex(null);
  };

  const handleCloseAlert = () => setMessage(null);

  // ------------------------------------------------------------
  // 🧱 Renderização
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Gerenciador Completo de Listas
        </h1>

        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        {/* Formulário principal para nova lista */}
        {!isFormOpen && !editingListId && activeListId === null && (
          <div className="flex justify-center mb-6">
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              ➕ Criar Nova Lista
            </Button>
          </div>
        )}

        {isFormOpen && (
          <ListForm onSubmit={handleAddList} onCancel={handleCancelForm} />
        )}

        {editingListId && (
          <ListForm
            onSubmit={handleEditList}
            onCancel={handleCancelForm}
          />
        )}

        {/* Exibe todas as listas */}
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
                    <Button
                      variant="default"
                      onClick={() => setEditingListId(list.id)}
                    >
                      ✏️ Editar Lista
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      🗑️ Excluir Lista
                    </Button>
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
                  <ul className="list-disc list-inside space-y-2">
                    {list.items.map((item, index) => (
                      <li key={index} className="pl-2 flex justify-between items-center">
                        <div>
                          <strong>{item.name}</strong> — {item.description}
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="default"
                            onClick={() =>
                              setEditingItemIndex({ listId: list.id, index })
                            }
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDeleteItem(list.id, index)
                            }
                          >
                            🗑️
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Formulário para novo item */}
                {activeListId === list.id && (
                  <div className="mt-4">
                    <ListForm
                      onSubmit={(item) => handleAddItemToList(list.id, item)}
                      onCancel={handleCancelForm}
                    />
                  </div>
                )}

                {/* Formulário para editar item */}
                {editingItemIndex?.listId === list.id && (
                  <div className="mt-4">
                    <ListForm
                      onSubmit={handleEditItem}
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
