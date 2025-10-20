// ✅ Importa o React (necessário para JSX funcionar)
import React from "react";

// ✅ Importa os tipos do HTML padrão (neste caso, de <button>)
// Isso garante que o nosso componente reconheça todas as propriedades nativas, como onClick, disabled, etc.
import type { ButtonHTMLAttributes } from "react";

// ✅ Importa a biblioteca "clsx", usada para juntar classes condicionalmente
// Exemplo: clsx("btn", isActive && "btn-active") → "btn btn-active"
import clsx from "clsx";

// ------------------------------------------------------------
// 🔹 DEFINIÇÃO DE TIPOS PERSONALIZADOS
// ------------------------------------------------------------

// Tipos de variações visuais que o botão pode ter
// Isso limita as opções, ajudando o TypeScript a sugerir valores válidos
type ButtonVariant = "primary" | "success" | "danger" | "default";

// Tamanhos possíveis do botão (definidos via Tailwind)
type ButtonSize = "sm" | "md" | "lg";

// ------------------------------------------------------------
// 🔹 INTERFACE DE PROPRIEDADES (Props)
// ------------------------------------------------------------

// Extende as propriedades nativas de um <button> HTML padrão
// Assim, podemos usar atributos como onClick, disabled, type="submit", etc.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Define a variação de cor/estilo
  size?: ButtonSize;       // Define o tamanho
  fullWidth?: boolean;     // Se verdadeiro, o botão ocupa 100% da largura
}

// ------------------------------------------------------------
// 🔹 COMPONENTE BUTTON
// ------------------------------------------------------------

// React.FC<ButtonProps> indica que este é um Functional Component
// que aceita as props definidas acima
export const Button: React.FC<ButtonProps> = ({

  // Desestruturação das props (com valores padrão)
  children,           // Conteúdo interno do botão (texto ou ícones)
  variant = "default",// Se nenhuma variação for passada, usa "default"
  size = "md",        // Tamanho padrão médio
  fullWidth = false,  // Por padrão, o botão não ocupa toda a largura
  className,          // Classes extras opcionais que o usuário pode passar
  ...props            // O resto das props é repassado diretamente ao <button>
}) => {

  // ------------------------------------------------------------
  // 🔸 ESTILOS BASE
  // ------------------------------------------------------------
  // Classes do Tailwind que todos os botões terão
  const baseStyles =
    "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // ------------------------------------------------------------
  // 🔸 ESTILOS POR TAMANHO
  // ------------------------------------------------------------
  // Aqui definimos o padding e o tamanho da fonte para cada opção
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // ------------------------------------------------------------
  // 🔸 ESTILOS POR VARIAÇÃO
  // ------------------------------------------------------------
  // Cada variação usa cores diferentes (modo claro/escuro incluso)
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

  // ------------------------------------------------------------
  // 🔹 RETORNO (Renderização JSX)
  // ------------------------------------------------------------
  return (
    <button
      // clsx combina todas as classes dinamicamente
      className={clsx(
        baseStyles,          // estilos base comuns
        sizeStyles[size],    // tamanho definido pela prop "size"
        variantStyles[variant], // cor/estilo definido pela prop "variant"
        fullWidth && "w-full",  // aplica largura total se fullWidth=true
        className             // adiciona classes extras passadas manualmente
      )}

      // ...props espalha todas as propriedades adicionais (onClick, type, etc.)
      {...props}
    >
      {/* O conteúdo interno do botão (texto, ícone, etc.) */}
      {children}
    </button>
  );
};
