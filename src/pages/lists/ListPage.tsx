// ------------------------------------------------------------
// 📄 ListPage.tsx
// ------------------------------------------------------------
// Página principal do gerenciador de listas e itens.
// Cada lista contém:
//   - Nome e descrição
//   - Vários itens (com nome e descrição)
//   - Opções para editar e excluir
//
// ⚙️ Recursos atuais:
//  - Criar múltiplas listas
//  - Adicionar e remover itens dentro de cada lista
//  - Editar listas e itens
//  - Persistência automática via LocalStorage
//
// 🧱 Próximos passos possíveis:
//  - Filtro e busca
//  - Organização por tags
// ------------------------------------------------------------

import { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
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

export default function ListPage() {
  // ------------------------------------------------------------
  // 🔸 Estados principais
  // ------------------------------------------------------------
  const [lists, setLists] = useState<List[]>([]);
  const [activeListId, setActiveListId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingListId, setEditingListId] = useState<number | null>(null);

  // ------------------------------------------------------------
  // 🔹 Carrega listas do LocalStorage ao iniciar
  // ------------------------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("my-lists-data");
    if (stored) {
      try {
        setLists(JSON.parse(stored));
      } catch {
        console.error("Erro ao carregar listas salvas.");
      }
    }
  }, []);

  // ------------------------------------------------------------
  // 🔹 Salva listas sempre que houver alteração
  // ------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("my-lists-data", JSON.stringify(lists));
  }, [lists]);

  // ------------------------------------------------------------
  // 🔹 Cria uma nova lista
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
    setMessage(`✅ Lista "${data.name}" criada!`);
  };

  // ------------------------------------------------------------
  // 🔹 Adiciona item a uma lista específica
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
  // 🔹 Remove uma lista inteira
  // ------------------------------------------------------------
  const handleDeleteList = (listId: number) => {
    const listName = lists.find((l) => l.id === listId)?.name;
    if (window.confirm(`Excluir a lista "${listName}"?`)) {
      setLists((prev) => prev.filter((list) => list.id !== listId));
      setMessage(`🗑️ Lista "${listName}" removida.`);
    }
  };

  // ------------------------------------------------------------
  // 🔹 Edita uma lista (abre formulário com dados atuais)
  // ------------------------------------------------------------
  const handleEditList = (listId: number) => {
    setEditingListId(listId);
  };

  // ------------------------------------------------------------
  // 🔹 Salva alterações de uma lista editada
  // ------------------------------------------------------------
  const handleUpdateList = (data: { name: string; description: string }) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === editingListId
          ? { ...list, name: data.name, description: data.description }
          : list
      )
    );
    setEditingListId(null);
    setMessage("✏️ Lista atualizada com sucesso!");
  };

  // ------------------------------------------------------------
  // 🔹 Remove um item de uma lista
  // ------------------------------------------------------------
  const handleDeleteItem = (listId: number, itemIndex: number) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((_, i) => i !== itemIndex) }
          : list
      )
    );
    setMessage("🗑️ Item removido com sucesso!");
  };

  // ------------------------------------------------------------
  // 🔹 Cancelar qualquer formulário ativo
  // ------------------------------------------------------------
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setActiveListId(null);
    setEditingListId(null);
  };

  // ------------------------------------------------------------
  // 🔹 Limpa todas as listas
  // ------------------------------------------------------------
  const handleClearAll = () => {
    if (window.confirm("Deseja remover todas as listas?")) {
      setLists([]);
      localStorage.removeItem("my-lists-data");
      setMessage("🧹 Todas as listas foram apagadas.");
    }
  };

  // ------------------------------------------------------------
  // 🔹 Fecha alerta
  // ------------------------------------------------------------
  const handleCloseAlert = () => setMessage(null);

  // ------------------------------------------------------------
  // 🔸 Interface visual
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🗂️ Gerenciador de Listas — Edição e Exclusão
        </h1>

        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        <div className="flex justify-center mb-6 gap-3">
          {!isFormOpen && activeListId === null && editingListId === null && (
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              ➕ Criar Nova Lista
            </Button>
          )}
          {lists.length > 0 && (
            <Button variant="danger" onClick={handleClearAll}>
              🗑️ Limpar Tudo
            </Button>
          )}
        </div>

        {isFormOpen && (
          <ListForm onSubmit={handleAddList} onCancel={handleCancelForm} />
        )}

        {editingListId !== null && (
          <ListForm
            onSubmit={handleUpdateList}
            onCancel={handleCancelForm}
          />
        )}

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
                      variant="secondary"
                      onClick={() => handleEditList(list.id)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      ❌ Excluir
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setActiveListId(list.id)}
                    >
                      ➕ Item
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
                      <li key={index} className="pl-2 flex justify-between">
                        <span>
                          <strong>{item.name}</strong> — {item.description}
                        </span>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDeleteItem(list.id, index)
                          }
                        >
                          🗑️
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

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
