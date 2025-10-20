// src/components/ui/Card.tsx
// -----------------------------------------------------------------------------
// 📦 Componente "Card"
// Um bloco visual reutilizável para exibir conteúdo com título, corpo e rodapé.
// Suporta tema claro/escuro e transições suaves.
// -----------------------------------------------------------------------------

import React from "react";

// 🔹 Interface (tipagem) das propriedades aceitas pelo Card
interface CardProps {
  // (opcional) Título que aparecerá no topo do card
  title?: string;

  // Conteúdo interno do card (qualquer JSX passado entre <Card>...</Card>)
  children: React.ReactNode;

  // (opcional) Rodapé do card (ex: botões, links, ícones)
  footer?: React.ReactNode;

  // (opcional) Classe CSS adicional para personalização
  className?: string;
}

// -----------------------------------------------------------------------------
// 🧩 Definição do componente funcional Card
// -----------------------------------------------------------------------------
const Card: React.FC<CardProps> = ({ title, children, footer, className = "" }) => {
  return (
    // 🔸 Container principal do card
    // - bordas arredondadas
    // - sombra leve
    // - cores adaptáveis (tema claro/escuro)
    // - padding interno
    // - transição suave entre temas
    <div
      className={`rounded-2xl shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300 ${className}`}
    >
      {/* ---------------------------------------------------------------------
         🔹 Cabeçalho (opcional)
         Só é renderizado se a prop "title" for passada
         - texto maior e em negrito
         - borda inferior sutil
      ---------------------------------------------------------------------- */}
      {title && (
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </h2>
      )}

      {/* ---------------------------------------------------------------------
         🔹 Corpo do card
         Onde fica o conteúdo principal (as "children")
         - margem inferior para separar do rodapé
      ---------------------------------------------------------------------- */}
      <div className="mb-4">{children}</div>

      {/* ---------------------------------------------------------------------
         🔹 Rodapé (opcional)
         - só aparece se a prop "footer" for passada
         - geralmente contém botões ou ações
         - borda superior para separar do corpo
      ---------------------------------------------------------------------- */}
      {footer && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// ✨ Exportação padrão
// Permite importar com: `import Card from "./Card";`
// -----------------------------------------------------------------------------
export default Card;
