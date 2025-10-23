import React, { useState } from "react";
import { Button } from "../ui/Button";

/**
 * 📘 Interface que define as props que o componente ListForm aceita
 */
interface ListFormProps {
  // Função chamada quando o usuário envia o formulário (obrigatória)
  onSubmit: (data: { name: string; description: string }) => void;

  // Função chamada quando o usuário cancela o formulário (opcional)
  onCancel?: () => void;
}

/**
 * 🧩 Componente ListForm
 * - Coleta dados do usuário (nome e descrição)
 * - Chama as funções passadas por props (onSubmit, onCancel)
 */
export const ListForm: React.FC<ListFormProps> = ({ onSubmit, onCancel }) => {
  // Estado para os campos do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /**
   * 🔹 Envia os dados para o componente pai (ListPage)
   * - Previne o recarregamento da página (event.preventDefault)
   * - Chama o onSubmit com os dados
   * - Limpa o formulário após o envio
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Cria o objeto com os dados do formulário
    const formData = { name, description };

    // Envia para o pai
    onSubmit(formData);

    // Limpa os campos
    setName("");
    setDescription("");
  };

  return (
    // Card de formulário com aparência moderna
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        ✏️ Novo Item da Lista
      </h2>

      {/* Campo de Nome */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ex: Comprar pão"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo de Descrição */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descrição:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes sobre este item..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end space-x-2 pt-2">
        {/* Botão de cancelar (se existir onCancel) */}
        {onCancel && (
          <Button
            type="button"
            variant="danger"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}

        {/* Botão de enviar */}
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </div>
    </form>
  );
};
