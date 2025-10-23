import { useState } from "react";
import Header from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import { ListForm } from "../../components/lists/ListForm";

/**
 * 🗂️ Página: ListPage
 * - Exibe uma lista de itens (simples, em memória)
 * - Permite adicionar novos via ListForm
 * - Mostra mensagens de sucesso com Alert
 */
export default function ListPage() {
  // Estado da lista de itens
  const [items, setItems] = useState<
    { name: string; description: string }[]
  >([]);

  // Estado para controlar se o formulário está aberto
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Estado para mensagens temporárias
  const [message, setMessage] = useState<string | null>(null);

  /**
   * 🔹 Manipula o envio do formulário
   * - Adiciona o item à lista
   * - Fecha o formulário
   * - Mostra um alerta de sucesso
   */
  const handleAddItem = (data: { name: string; description: string }) => {
    setItems((prev) => [...prev, data]);
    setIsFormOpen(false);
    setMessage(`✅ Item "${data.name}" adicionado com sucesso!`);
  };

  /**
   * 🔹 Cancela o formulário
   */
  const handleCancelForm = () => {
    setIsFormOpen(false);
  };

  /**
   * 🔹 Fecha o alerta
   */
  const handleCloseAlert = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar fixa */}
      <Header />

      {/* Conteúdo principal */}
      <main className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📋 Gerenciador de Listas
        </h1>

        {/* Exibe alerta de sucesso */}
        {message && (
          <Alert type="success" onClose={handleCloseAlert}>
            {message}
          </Alert>
        )}

        {/* Botão para abrir o formulário */}
        {!isFormOpen && (
          <div className="flex justify-center mb-6">
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              ➕ Adicionar Item
            </Button>
          </div>
        )}

        {/* Formulário de criação */}
        {isFormOpen && (
          <ListForm onSubmit={handleAddItem} onCancel={handleCancelForm} />
        )}

        {/* Lista de cards */}
        <div className="max-w-2xl mx-auto space-y-4 mt-8">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum item adicionado ainda.</p>
          ) : (
            items.map((item, index) => (
              <Card key={index} title={item.name}>
                <p>{item.description || "Sem descrição."}</p>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
