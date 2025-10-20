# My React Components

Projeto React + Vite + Tailwind CSS v4 com suporte completo a tema claro, escuro e sistema.

## Funcionalidades

- Alternância de tema (claro, escuro, sistema) com persistência no `localStorage`.
- Layout responsivo com Navbar e suporte a mobile menu.
- Componentes UI reutilizáveis:
  - `Button` com variantes (default, primary, success, danger) e tamanhos (sm, md, lg)
  - `Input` com label opcional e suporte a dark mode
  - `DarkModeToggle` para alternância de tema
- Suporte a Tailwind v4 com dark mode configurado via `@custom-variant`.

## Estrutura do Projeto

src/
├─ components/
│ ├─ layout/
│ │ └─ Header.tsx
│ └─ ui/
│ ├─ Button.tsx
│ ├─ Input.tsx
│ └─ DarkModeToggle.tsx
├─ pages/
│ └─ HomePage.tsx
├─ App.tsx
├─ main.tsx
└─ index.css

markdown
Copiar código

## Scripts

- `npm install` → instala dependências
- `npm run dev` → inicia servidor de desenvolvimento Vite
- `npm run build` → build de produção
- `npm run preview` → preview local do build de produção

## Tailwind CSS

- Dark mode configurado via classe `.dark`
- Arquivo `index.css` contém configuração global:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  html {
    @apply bg-white text-gray-900 transition-colors duration-300;
  }

  html.dark {
    @apply bg-gray-900 text-gray-100;
  }
}