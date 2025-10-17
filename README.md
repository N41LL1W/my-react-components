# 🌗 My React Components — Tema com Modo Escuro e Modo do Sistema

Este projeto é uma base moderna para componentes React, utilizando **Vite**, **React 18+** e **Tailwind CSS v4**, com suporte completo a **tema claro**, **escuro** e **automático (modo do sistema)**.

---

## 🚀 Tecnologias

- ⚛️ React + TypeScript  
- 💨 Tailwind CSS v4  
- ⚙️ Vite  
- 💾 LocalStorage (para salvar o tema)  
- 💻 Detecção automática do modo do sistema  

---

## 🧩 Estrutura principal

src/
├── components/
│ └── ui/
│ └── DarkModeToggle.tsx
├── pages/
│ └── HomePage.tsx
├── index.css
├── App.tsx
└── main.tsx

yaml
Copiar código

---

## 🎨 Como o tema funciona

- O arquivo `index.css` define o modo escuro com a nova sintaxe do Tailwind v4:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
O componente DarkModeToggle.tsx:

Alterna entre os temas Claro, Escuro e Sistema.

Salva a preferência no localStorage.

Monitora automaticamente o tema do sistema (Windows, macOS, etc).

💻 Scripts úteis
bash
Copiar código
# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Fazer build de produção
npm run build

# Pré-visualizar o build
npm run preview