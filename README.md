README - MyReactComponents
🔹 Visão Geral

Este projeto é um exemplo completo de React + Vite + Tailwind v4 com suporte a:

Tema claro, escuro e modo do sistema

Componente reutilizáveis:

Button

Input

Card

Alert

Modal

Navegação entre páginas:

Home

Listas (criação de listas e itens)

Responsividade e design moderno com TailwindCSS

🔹 Estrutura do Projeto
src/
├─ components/
│  ├─ layout/
│  │  └─ Header.tsx        # Navbar com toggle de tema
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  ├─ Card.tsx
│  │  ├─ Alert.tsx
│  │  └─ Modal.tsx
│  └─ lists/
│     └─ ListForm.tsx
├─ pages/
│  ├─ HomePage.tsx
│  └─ lists/
│     └─ ListPage.tsx
├─ App.tsx
├─ main.tsx
└─ index.css

🔹 Funcionalidades Atuais
HomePage

Exibe Navbar unificada

Exemplo de Card

Botões para abrir modal e mostrar alertas (info, sucesso, aviso, erro)

Texto de apresentação

ListPage

Criar múltiplas listas

Adicionar itens dentro de cada lista

Alertas de sucesso

Formulário de criação de lista/itens com largura centralizada

Layout responsivo

Componentes Reutilizáveis

Button: variantes primary, success, danger, default

Input: campos de texto com label

Card: container com título, conteúdo e footer

Alert: diferentes tipos de alerta (info, success, warning, error)

Modal: janela modal com título e conteúdo

Header: navbar responsiva com alternância de tema