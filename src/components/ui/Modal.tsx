// ✅ Importa o React e alguns hooks úteis
import React, { useEffect } from "react";
import { createPortal } from "react-dom"; // cria o "portal" para renderizar fora da árvore principal
import { X } from "lucide-react"; // ícone de fechar

// ------------------------------------------------------------
// 🔹 INTERFACE DE PROPRIEDADES (Props)
// ------------------------------------------------------------
interface ModalProps {
  isOpen: boolean; // controla se o modal está aberto
  onClose: () => void; // função chamada ao fechar o modal
  title?: string; // título opcional
  children?: React.ReactNode; // conteúdo do modal
  size?: "sm" | "md" | "lg"; // tamanho (opcional)
  className?: string; // classes adicionais (opcional)
}

// ------------------------------------------------------------
// 🔹 COMPONENTE PRINCIPAL: Modal
// ------------------------------------------------------------
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}) => {
  // ------------------------------------------------------------
  // 🔹 Bloqueia o scroll do body quando o modal está aberto
  // ------------------------------------------------------------
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  // ------------------------------------------------------------
  // 🔹 Se o modal não estiver aberto, não renderiza nada
  // ------------------------------------------------------------
  if (!isOpen) return null;

  // ------------------------------------------------------------
  // 🔹 Define tamanhos pré-configurados
  // ------------------------------------------------------------
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  // ------------------------------------------------------------
  // 🔹 Corpo do modal
  // ------------------------------------------------------------
  const modalContent = (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 dark:bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
      "
      onClick={onClose} // fecha ao clicar fora do modal
    >
      {/* 
        🔹 Div do conteúdo principal do modal
        🔹 'e.stopPropagation()' impede o clique interno de fechar o modal
      */}
      <div
        className={`
          relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          rounded-2xl shadow-xl w-full ${sizeClasses[size]} p-6 mx-4
          transition-transform duration-300 ease-out
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Cabeçalho do modal (título + botão fechar) */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🔹 Corpo do modal (conteúdo passado via props.children) */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );

  // ------------------------------------------------------------
  // 🔹 Cria um portal — renderiza o modal fora da hierarquia normal
  // Isso evita problemas de z-index e estilização
  // ------------------------------------------------------------
  return createPortal(modalContent, document.body);
};

// ✅ Exporta o componente
export default Modal;
