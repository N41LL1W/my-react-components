import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";

interface MyListItem extends BaseListItem {
  name: string;
  description?: string;
}

const initialItems: MyListItem[] = [
  { id: uuidv4(), name: "Primeiro Item", description: "Este é um item inicial." },
  { id: uuidv4(), name: "Segundo Item", description: "Outro item para começar." },
];

function ListCreatePage() {
  const [currentListItems, setCurrentListItems] = useState<MyListItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemDescription, setNewItemDescription] = useState<string>("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() === "") return;

    const newItem: MyListItem = {
      id: uuidv4(),
      name: newItemName,
      description: newItemDescription,
    };

    setCurrentListItems((prevItems) => [...prevItems, newItem]);
    setNewItemName("");
    setNewItemDescription("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Criar Novo Item para a Lista</h2>

      <form
        onSubmit={handleAddItem}
        className="mb-6 p-4 border rounded-lg max-w-md space-y-3"
      >
        <div>
          <label htmlFor="itemName" className="block text-sm mb-1">
            Nome do Item:
          </label>
          <input
            id="itemName"
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Ex: Tarefa Importante"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="itemDescription" className="block text-sm mb-1">
            Descrição:
          </label>
          <textarea
            id="itemDescription"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Detalhes do item..."
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Adicionar Item
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Lista Atual:</h3>
      <List
        title="Itens Criados"
        items={currentListItems}
        renderItem={(item) => (
          <div>
            <strong>{item.name}</strong>
            {item.description && (
              <p className="text-sm text-gray-600 m-0">{item.description}</p>
            )}
          </div>
        )}
        emptyMessage="Comece a adicionar itens usando o formulário acima!"
      />
    </div>
  );
}

export default ListCreatePage;
