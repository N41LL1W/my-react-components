// Importa o React e o hook useState
import { useState } from "react";

// Importa os componentes usados na página
import Navbar from "../components/layout/Navbar";
import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert"; 
import DataTable from "../components/DataTable"; // Assumindo que este é o DataGrid ou CustomDataTable

// 🚩 NOVO: Importa o componente reutilizável e os dados de exemplo (top100Films)
import CheckboxesTags, { top100Films } from "../components/data/CheckboxesTags";

// ------------------------------------------------------------
// 🔹 Componente principal da página inicial
// ------------------------------------------------------------
export default function HomePage() {
  // Estado que controla o Modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Estado que controla o alerta atual
  const [alertType, setAlertType] = useState<string | null>(null);

  // 🚩 NOVO ESTADO: Armazena os filmes selecionados pelo CheckboxesTags
  const [selectedFilms, setSelectedFilms] = useState<any[]>([]);

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
          🔹 CHECKBOX AUTOCOMPLETE (NOVO USO REUTILIZÁVEL)
        ------------------------------------------------------------- */}
        <div className="p-10 w-full max-w-lg mx-auto"> 
          <h1 className="text-xl mb-6 font-semibold">Selecione seus filmes favoritos</h1>
          
          <CheckboxesTags 
            options={top100Films} // 👈 Dados de opções passados via prop
            label="Escolha Filmes"
            // 👈 Função para atualizar o estado do componente pai
            onSelectionChange={setSelectedFilms} 
          />

          {/* Exibe o resultado para visualização */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
            <p className="font-medium text-sm">Filmes Selecionados ({selectedFilms.length}):</p>
            <ul className="text-xs list-disc list-inside">
              {selectedFilms.length > 0
                ? selectedFilms.map((film, index) => (
                    <li key={index}>{film.title} ({film.year})</li>
                  ))
                : <li>Nenhum filme selecionado.</li>
              }
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------------
          🔹 TABELA
        ------------------------------------------------------------- */}

        <div className="p-8 w-full max-w-4xl mx-auto"> 
          <h1 className="text-2xl font-bold mb-4">Minha Tabela de Dados</h1>
          {/* Aqui o DataGrid será renderizado */}
          <DataTable />
        </div>

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