// Importa o React e o hook useState
import { useState } from "react";

// Importa os componentes usados na página
import Navbar from "../components/layout/Navbar";
import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert"; // ✅ Importa o componente de Alert

// ------------------------------------------------------------
// 🔹 Componente principal da página inicial
// ------------------------------------------------------------
export default function HomePage() {
  // Estado que controla o Modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Estado que controla o alerta atual
  const [alertType, setAlertType] = useState<string | null>(null);

  return (
    // 🔹 Container principal com fundo adaptável ao tema
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar no topo */}
      <Navbar />

      {/* Corpo principal da página */}
      <main className="pt-20 flex flex-col items-center justify-center p-8">
        {/* Título principal */}
        <h1 className="text-4xl font-bold mb-6">Bem-vindo 👋</h1>

        {/* ------------------------------------------------------------
          🔸 CARD PRINCIPAL
          - Título: “Meu primeiro Card”
          - Conteúdo: texto e botões para abrir Modal e Alerts
        ------------------------------------------------------------- */}
        <Card
          title="Meu primeiro Card"
          footer={
            <div className="flex justify-end space-x-2">
              {/* Botão que abre o modal */}
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Abrir Modal
              </Button>
            </div>
          }
        >
          {/* Conteúdo dentro do card */}
          <p>Este é o conteúdo do card — você pode personalizar livremente! 🚀</p>

          {/* ------------------------------------------------------------
            🔹 SEÇÃO DOS BOTÕES DE ALERTA
            - Cada botão exibe um tipo diferente de alerta
          ------------------------------------------------------------- */}
          <div className="flex flex-wrap justify-center gap-3 pt-5">
            {/* 🔵 Botão para mostrar alerta de informação */}
            <Button variant="primary" onClick={() => setAlertType("info")}>
              Mostrar Info
            </Button>

            {/* 🟢 Botão para mostrar alerta de sucesso */}
            <Button variant="success" onClick={() => setAlertType("success")}>
              Mostrar Sucesso
            </Button>

            {/* 🟡 Botão para mostrar alerta de aviso */}
            <Button variant="default" onClick={() => setAlertType("warning")}>
              Mostrar Aviso
            </Button>

            {/* 🔴 Botão para mostrar alerta de erro */}
            <Button variant="danger" onClick={() => setAlertType("error")}>
              Mostrar Erro
            </Button>
          </div>

          {/* ------------------------------------------------------------
            🔸 ALERTAS CONDICIONAIS
            - São exibidos apenas quando o tipo correspondente é selecionado
          ------------------------------------------------------------- */}
          <div className="mt-6 space-y-2">
            {alertType === "info" && (
              <Alert type="info" onClose={() => setAlertType(null)}>
                Este é um alerta informativo 💡
              </Alert>
            )}

            {alertType === "success" && (
              <Alert type="success" onClose={() => setAlertType(null)}>
                Operação concluída com sucesso! ✅
              </Alert>
            )}

            {alertType === "warning" && (
              <Alert type="warning" onClose={() => setAlertType(null)}>
                Atenção! Verifique as informações. ⚠️
              </Alert>
            )}

            {alertType === "error" && (
              <Alert type="error" onClose={() => setAlertType(null)}>
                Ocorreu um erro inesperado. ❌
              </Alert>
            )}
          </div>
        </Card>

        {/* ------------------------------------------------------------
          🔹 MODAL
          - Abre quando o usuário clica no botão “Abrir Modal”
        ------------------------------------------------------------- */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Exemplo de Modal"
          size="md"
        >
          <p>Conteúdo do modal. Você pode colocar qualquer coisa aqui! 💡</p>
          <div className="flex justify-end mt-6">
            <Button variant="success" onClick={() => setModalOpen(false)}>
              Fechar
            </Button>
          </div>
        </Modal>

        {/* ------------------------------------------------------------
          🔹 TEXTO FINAL
        ------------------------------------------------------------- */}
        <p className="text-lg mt-8 text-center max-w-lg">
          Projeto React + Vite + Tailwind v4 com suporte completo a tema claro,
          escuro e sistema.
        </p>
      </main>
    </div>
  );
}
