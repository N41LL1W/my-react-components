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

function ListManagePage() {
  const [items, setItems] = useState<MyListItem[]>([
    {
      id: uuidv4(),
      name: "Estudar React",
      description: "Revisar hooks e componentes",
    },
    {
      id: uuidv4(),
      name: "Fazer compras",
      description: "Comprar frutas e vegetais",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddItem = () => {
    if (!newName.trim()) return;

    const newItem: MyListItem = {
      id: uuidv4(),
      name: newName,
      description: newDescription,
    };

    setItems((prev) => [...prev, newItem]);
    setNewName("");
    setNewDescription("");
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciar Lista</h1>

      {/* Formulário de criação */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          label="Nome"
          placeholder="Digite o nome da tarefa"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Input
          label="Descrição"
          placeholder="Digite a descrição"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button onClick={handleAddItem}>Adicionar</Button>
      </div>

      {/* Lista renderizada */}
      <List
        title="Minhas Tarefas"
        items={items}
        renderItem={(item) => (
          <div className="flex justify-between items-center w-full">
            <div>
              <strong>{item.name}</strong>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
            <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
              Remover
            </Button>
          </div>
        )}
      />
    </div>
  );
}

export default ListManagePage;
