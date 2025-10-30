// ------------------------------------------------------------
// 📘 Tooltip.tsx
// ------------------------------------------------------------
// Componente Tooltip (dica visual)
// Exibe um pequeno balão de texto quando o usuário passa o mouse
// sobre um elemento. Agora com animação suave e tema adaptável.
// ------------------------------------------------------------

import { useState } from "react";
import type { ReactNode } from "react";

// ------------------------------------------------------------
// 🔹 Interface de propriedades
// ------------------------------------------------------------
interface TooltipProps {
  content: string; // Texto exibido no tooltip
  children: ReactNode; // Elemento que ativa o tooltip
  position?: "top" | "bottom" | "left" | "right"; // Posição opcional
}

// ------------------------------------------------------------
// 🔸 Componente Tooltip principal
// ------------------------------------------------------------
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* 🔹 Elemento que recebe o hover */}
      {children}

      {/* 🔹 Tooltip em si */}
      <div
        className={`
          absolute text-sm rounded-md px-2 py-1 shadow-md z-20
          bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900
          whitespace-nowrap transition-all duration-300 ease-in-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          ${position === "top" ? "-top-8 left-1/2 -translate-x-1/2" : ""}
          ${position === "bottom" ? "top-8 left-1/2 -translate-x-1/2" : ""}
          ${position === "left" ? "top-1/2 -left-2 -translate-x-full -translate-y-1/2" : ""}
          ${position === "right" ? "top-1/2 left-8 -translate-y-1/2" : ""}
        `}
      >
        {content}
      </div>
    </div>
  );
};
