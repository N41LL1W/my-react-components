import React from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // label opcional
  fullWidth?: boolean; // ocupa 100% do container
}

export const Input: React.FC<InputProps> = ({ label, fullWidth = true, className, ...props }) => {
  return (
    <div className={clsx("flex flex-col", fullWidth && "w-full")}>
      {/* Label, se fornecido */}
      {label && (
        <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Input controlado pelo usuário */}
      <input
        className={clsx(
          "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
          fullWidth && "w-full",
          className
        )}
        {...props} // props padrões de <input>
      />
    </div>
  );
};
