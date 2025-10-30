// src/components/ui/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

// 🔹 Tipos de props aceitas pelo Dropdown
interface DropdownProps {
  label: string; // Texto do botão que abre o dropdown
  options: string[]; // Lista de opções
  onSelect: (value: string) => void; // Função chamada ao selecionar
  fullWidth?: boolean; // Se true, ocupa toda largura do container
}

// 🔹 Componente Dropdown
export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  fullWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Controle de abertura
  const dropdownRef = useRef<HTMLDivElement>(null); // Referência do container

  // 🔹 Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx("relative", fullWidth && "w-full")} ref={dropdownRef}>
      {/* Botão que abre/fecha dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {label} ▾
      </button>

      {/* Lista de opções */}
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition"
              onClick={() => {
                onSelect(option); // chama função de seleção
                setIsOpen(false); // fecha dropdown
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
