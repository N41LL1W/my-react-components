// Importamos o React, necessário para JSX (mesmo que no React 18+ ele não seja obrigatório em todos os arquivos)
import React from "react";

// Importa a API do ReactDOM para renderizar o React na página
import ReactDOM from "react-dom/client";

// Importa o componente principal do nosso app
import App from "./App";

// Importa o CSS global (Tailwind está dentro dele)
import "./index.css";

/* 
──────────────────────────────────────────────
🖥️ INICIALIZAÇÃO DO APP
──────────────────────────────────────────────
*/

/* 
ReactDOM.createRoot(...) 
→ Cria uma raiz de renderização do React no DOM.
- `document.getElementById("root")!` 
  busca a div com id="root" no index.html.
- O `!` é um non-null assertion, diz pro TypeScript que "confie, esse elemento existe".

Obs: React 18 usa `createRoot` ao invés de `ReactDOM.render`.
*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  /* 
  React.StrictMode
  → Componente especial do React que ativa verificações adicionais
    durante o desenvolvimento.
  - Não afeta produção.
  - Ajuda a encontrar problemas de renderização ou ciclos inesperados.
  */
  <React.StrictMode>
    {/* 
    Aqui é onde colocamos nosso App.
    Todo JSX dentro do <App /> será renderizado dentro da div #root.
    O CSS do Tailwind será aplicado automaticamente por importação do index.css.
    */}
    <App />
  </React.StrictMode>
);
