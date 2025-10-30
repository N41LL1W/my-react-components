// ------------------------------------------------------------
// 📘 Button.tsx
// ------------------------------------------------------------
// Botão reutilizável com variantes de cor
// ------------------------------------------------------------

import React from "react";
import clsx from "clsx";

// 🔹 Tipos de botão permitidos
type ButtonVariant = "primary" | "success" | "danger" | "default" | "secondary"; // ✅ Adicionamos "secondary"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// ------------------------------------------------------------
// 🔸 Componente principal
// ------------------------------------------------------------
export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none shadow-sm";

  // 🔹 Define estilos específicos para cada variante
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white", // ✅ Novo estilo para edição
    default:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
