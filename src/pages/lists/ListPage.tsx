// ------------------------------------------------------------
// 📄 ListPage.tsx
// ------------------------------------------------------------
// Esta página gerencia múltiplas listas, e dentro de cada lista,
// o usuário pode adicionar itens. Cada lista possui:
//   - Um nome e descrição
//   - Vários itens internos
//
// ⚙️ Recursos atuais:
//  - Criar múltiplas listas
//  - Adicionar itens dentro de cada lista
//  - Mostrar alertas de sucesso
//  - Salvar e carregar listas automaticamente via LocalStorage
//
// 🧱 Próximos passos possíveis:
//  - Editar e excluir listas/itens individualmente
//  - Sincronização com API (futuro)
// ------------------------------------------------------------

import { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { ListForm } from "../../components/lists/ListForm";

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

  // Todas as listas criadas
  const [lists, setLists] = useState<List[]>([]);

  // Lista atualmente selecionada para adicionar itens
  const [activeListId, setActiveListId] = useState<number | null>(null);

  // Controla a exibição do formulário de nova lista
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Mensagem temporária para feedback (usada em Alert)
  const [message, setMessage] = useState<string | null>(null);

  // ------------------------------------------------------------
  // 🔹 Carrega dados do LocalStorage ao iniciar a página
  // ------------------------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("my-lists-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLists(parsed);
      } catch (err) {
        console.error("Erro ao carregar listas do LocalStorage:", err);
      }
    }
  }, []);

  // ------------------------------------------------------------
  // 🔹 Sempre que "lists" mudar → salva no LocalStorage
  // ------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("my-lists-data", JSON.stringify(lists));
  }, [lists]);

  // ------------------------------------------------------------
  // 🔹 Adiciona uma nova lista
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
    setMessage(`✅ Lista "${data.name}" criada e salva com sucesso!`);
  };

  // ------------------------------------------------------------
  // 🔹 Adiciona um item dentro de uma lista específica
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
    setMessage(`📝 Item "${item.name}" adicionado à lista e salvo!`);
  };

  // ------------------------------------------------------------
  // 🔹 Cancela formulário de criação (lista ou item)
  // ------------------------------------------------------------
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setActiveListId(null);
  };

  // ------------------------------------------------------------
  // 🔹 Fecha o alerta de mensagem
  // ------------------------------------------------------------
  const handleCloseAlert = () => {
    setMessage(null);
  };

  // ------------------------------------------------------------
  // 🔹 Limpa todas as listas (opcional)
  // ------------------------------------------------------------
  const handleClearAll = () => {
    setLists([]);
    localStorage.removeItem("my-lists-data");
    setMessage("🗑️ Todas as listas foram removidas.");
  };

  // ------------------------------------------------------------
  // 🔸 Interface visual da página
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 🔹 Cabeçalho fixo no topo */}
      <Header />

      {/* 🔹 Conteúdo principal */}
      <main className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📚 Gerenciador de Listas e Itens (com persistência)
        </h1>

        {/* ------------------------------------------------------------
          🔸 Alerta de feedback (sucesso, informação, etc)
        ------------------------------------------------------------- */}
        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        {/* ------------------------------------------------------------
          🔸 Botões principais (criar lista / limpar tudo)
        ------------------------------------------------------------- */}
        <div className="flex justify-center mb-6 gap-3">
          {!isFormOpen && activeListId === null && (
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

        {/* ------------------------------------------------------------
          🔸 Formulário para criar nova lista
        ------------------------------------------------------------- */}
        {isFormOpen && (
          <ListForm onSubmit={handleAddList} onCancel={handleCancelForm} />
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
                    <Button
                      variant="primary"
                      onClick={() => setActiveListId(list.id)}
                    >
                      ➕ Adicionar Item
                    </Button>
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

                {/* Formulário para adicionar item nesta lista */}
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
