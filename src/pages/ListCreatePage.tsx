import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "../components/List/List";
import type { BaseListItem } from "../components/List/List";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

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
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: MyListItem = { id: uuidv4(), name: newItemName, description: newItemDescription };
    setCurrentListItems((prev) => [...prev, newItem]);
    setNewItemName("");
    setNewItemDescription("");
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Criar Novo Item para a Lista</h1>

      <form onSubmit={handleAddItem} className="space-y-4 p-4 border rounded-lg">
        <Input label="Nome do Item" placeholder="Ex: Tarefa Importante" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} required />
        <Input label="Descrição" placeholder="Detalhes do item..." value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)} />
        <Button type="submit" variant="success" className="w-full">Adicionar Item</Button>
      </form>

      <h2 className="text-xl font-semibold">Lista Atual</h2>
      <List
        title="Itens Criados"
        items={currentListItems}
        renderItem={(item) => (
          <div>
            <strong>{item.name}</strong>
            {item.description && <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>}
          </div>
        )}
        emptyMessage="Comece a adicionar itens usando o formulário acima!"
      />
    </div>
  );
}

export default ListCreatePage;
