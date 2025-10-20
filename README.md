# My React Components

Projeto React + Vite + Tailwind CSS v4, com suporte completo a **tema claro, escuro e sistema**, além de componentes UI reutilizáveis.

---

## 🚀 Tecnologias Utilizadas

- **React 18**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **clsx** (para manipulação condicional de classes)
- **React Router v6**

---

## 🏗 Estrutura de Pastas

src/
├─ components/ # Componentes reutilizáveis
│ ├─ layout/ # Componentes de layout (Navbar, Header)
│ ├─ ui/ # Componentes UI (Button, Input, Card, Alert, Modal, DarkModeToggle)
├─ context/ # Contextos do React (tema, etc.)
├─ hooks/ # Hooks personalizados (se houver)
├─ pages/ # Páginas da aplicação
├─ App.tsx # Componente raiz
├─ main.tsx # Ponto de entrada do React
├─ index.css # Estilos globais e configuração Tailwind

markdown
Copiar código

---

## 🧩 Componentes Criados

### Layout

- **Navbar/Header**
  - Barra de navegação fixa.
  - Botão de menu para mobile.
  - Alternância de tema (claro, escuro, sistema).

### UI

- **Button**
  - Variantes: `default`, `primary`, `success`, `danger`.
  - Tamanhos: `sm`, `md`, `lg`.
  - `fullWidth` opcional.
  
- **Input**
  - Input com label opcional.
  - Full width opcional.
  
- **Card**
  - Título, corpo e footer personalizáveis.
  
- **Alert**
  - Tipos: `info`, `success`, `warning`, `error`.
  - Suporta fechamento com `onClose`.
  
- **Modal**
  - Janela modal com título, corpo e footer.
  - Controle de abertura via estado.
  
- **DarkModeToggle**
  - Alterna entre `light`, `dark` e `system`.
  - Armazena preferência no `localStorage`.
  - Detecta mudanças no tema do sistema.

---

## ⚡ Funcionalidades

- Suporte a **tema claro/escuro/sistema** em toda a aplicação.
- Layout responsivo com Tailwind CSS.
- Componentes reutilizáveis para facilitar novas páginas.
- Transições suaves entre temas.

---

## 🛠 Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Rodar projeto em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar vercel localmente (se tiver CLI Vercel)
vercel dev