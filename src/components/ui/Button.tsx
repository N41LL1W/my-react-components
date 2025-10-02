// src/components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
  outline:
    "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
