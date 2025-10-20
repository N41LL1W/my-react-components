import React from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx"; // helper para concatenar classes condicionalmente

// Tipos possíveis de botão
type ButtonVariant = "primary" | "success" | "danger" | "default";
type ButtonSize = "sm" | "md" | "lg";

// Props do botão
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // estilo
  size?: ButtonSize; // tamanho
  fullWidth?: boolean; // largura total
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  fullWidth = false,
  className,
  ...props
}) => {
  // Estilos base do botão
  const baseStyles =
    "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // Estilos por tamanho
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Estilos por tipo
  const variantStyles = {
    default:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    success:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full", // largura total se fullWidth=true
        className // classes extras vindas do usuário
      )}
      {...props} // props padrões de <button>
    >
      {children} {/* Texto ou conteúdo dentro do botão */}
    </button>
  );
};
