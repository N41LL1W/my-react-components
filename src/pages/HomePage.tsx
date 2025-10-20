// Importa o componente Navbar, localizado dentro da pasta "components/layout"
import Navbar from "../components/layout/Navbar";

// Função principal do componente de página "HomePage"
export default function HomePage() {
  return (
    // 🔹 Div principal que ocupa a tela inteira (min-h-screen = altura mínima igual à tela)
    // 🔹 Usa cores diferentes dependendo do tema (claro ou escuro)
    // 🔹 "transition-colors duration-300" suaviza a transição entre temas
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Renderiza o componente Navbar no topo da página */}
      <Navbar />

      {/* 
        🔹 "pt-20" adiciona padding-top (espaçamento superior) 
        🔹 Isso evita que o conteúdo fique escondido atrás da Navbar fixa
        🔹 Flexbox centraliza vertical e horizontalmente o conteúdo
      */}
      <main className="pt-20 flex flex-col items-center justify-center p-8">
        
        {/* Título principal da página */}
        <h1 className="text-4xl font-bold mb-6">Bem-vindo 👋</h1>
        
        {/* Texto descritivo com centralização e largura máxima */}
        <p className="text-lg mb-8 text-center max-w-lg">
          Projeto React + Vite + Tailwind v4 com suporte completo a tema claro,
          escuro e sistema.
        </p>
      </main>
    </div>
  );
}
