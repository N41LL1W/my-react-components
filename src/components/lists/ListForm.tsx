// ------------------------------------------------------------
// 📄 ListForm.tsx
// ------------------------------------------------------------
// Formulário genérico usado tanto para criar/editar Listas quanto Itens.
// Agora detecta automaticamente o contexto com base nas props recebidas.
// ------------------------------------------------------------

import { useState } from "react";
import { Button } from "../ui/Button";

// ------------------------------------------------------------
// 🔹 Tipos de Props
// ------------------------------------------------------------
interface ListFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel: () => void;

  // Campos opcionais para edição
  initialData?: { name: string; description: string };

  // Define o contexto: “list” ou “item”
  type?: "list" | "item";

  // Define se é modo de edição
  isEditing?: boolean;
}

// ------------------------------------------------------------
// 🔸 Componente principal
// ------------------------------------------------------------
export function ListForm({
  onSubmit,
  onCancel,
  initialData,
  type = "list", // padrão: criando lista
  isEditing = false,
}: ListFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  // ------------------------------------------------------------
  // 🧠 Título dinâmico
  // ------------------------------------------------------------
  const getTitle = () => {
    if (type === "list") {
      return isEditing ? "✏️ Editar Lista" : "🆕 Nova Lista";
    } else {
      return isEditing ? "✏️ Editar Item" : "🆕 Novo Item";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, description });
    setName("");
    setDescription("");
  };

  // ------------------------------------------------------------
  // 🧱 Renderização
  // ------------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-3">{getTitle()}</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Digite o nome..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          placeholder="Descrição opcional..."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-3">
        <Button type="submit" variant="primary">
          💾 Salvar
        </Button>
        <Button type="button" variant="default" onClick={onCancel}>
          ❌ Cancelar
        </Button>
      </div>
    </form>
  );
}
