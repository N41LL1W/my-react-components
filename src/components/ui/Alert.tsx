import React from "react";
import clsx from "clsx";

// ------------------------------------------------------------
// 🔹 Tipos possíveis de alerta
// ------------------------------------------------------------
type AlertType = "info" | "success" | "warning" | "error";

// ------------------------------------------------------------
// 🔹 Definição das propriedades (props) do componente Alert
// ------------------------------------------------------------
interface AlertProps {
  type?: AlertType; // tipo de alerta (define cor/estilo)
  children: React.ReactNode; // conteúdo do alerta
  onClose?: () => void; // 👈 nova prop opcional para fechar o alerta
}

// ------------------------------------------------------------
// 🔹 Componente principal: Alert
// ------------------------------------------------------------
const Alert: React.FC<AlertProps> = ({ type = "info", children, onClose }) => {
  // Estilos base para todos os tipos
  const baseStyles =
    "p-4 rounded-md border flex items-start justify-between gap-3 shadow-sm";

  // Estilos específicos por tipo
  const typeStyles = {
    info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
    success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
    error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
  };

  return (
    // 🔸 Container principal do alerta
    <div className={clsx(baseStyles, typeStyles[type])}>
      {/* Texto (conteúdo do alerta) */}
      <div className="flex-1">{children}</div>

      {/* Botão opcional de fechar — só aparece se onClose for passado */}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-lg font-bold hover:opacity-70 focus:outline-none"
          aria-label="Fechar alerta"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
