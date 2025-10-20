// Importa o componente "HomePage" que representa a tela inicial do aplicativo
import HomePage from "./pages/HomePage";

// Função principal do componente "App"
// 🔹 Este é o ponto de entrada do aplicativo React (depois do "main.tsx")
// 🔹 Ele define qual página ou estrutura principal será renderizada
export default function App() {
  // Retorna o JSX que será exibido no navegador
  // Neste caso, o App apenas carrega o componente HomePage.
  // ➜ Isso é útil porque futuramente você pode trocar por um sistema de rotas (ex: React Router)
  return <HomePage />;
}
