⚛️ Fusion UI: Component Library Starter (React + TS + Tailwind + MUI)

✨ Visão Geral do Projeto

O Fusion UI é um starter kit de desenvolvimento React focado na criação de componentes de interface de utilizador (UI) altamente reutilizáveis, tipados (TypeScript) e com uma experiência de utilizador (UX) moderna.

Ele combina as melhores práticas de design system e desenvolvimento front-end:

Fundação Estética: Tailwind CSS para utilitários e personalização rápida.

Componentes Complexos: Material-UI (MUI) para widgets de dados e inputs avançados.

Segurança: TypeScript para garantia de tipo e refatoração segura.

🛠️ Stack Tecnológico

Categoria

Tecnologia

Objetivo

Framework

React

Criação de interfaces de utilizador baseada em componentes.

Linguagem

TypeScript

Tipagem estática para código mais robusto e escalável.

Estilização

Tailwind CSS

Abordagem utilitária para design rápido e responsivo.

UI Kit

Material-UI (MUI)

Componentes de alta qualidade e complexos (e.g., DataGrid, Forms).

UX Core

Tema Claro/Escuro

Suporte nativo para alternância e persistência de tema.

📂 Estrutura Modular

A arquitetura do projeto é projetada para separação clara de responsabilidades:

src/
├── components/
│ ├── layout/
│ │ └── Navbar.tsx     # Navegação e alternância de tema
│ ├── ui/
│ │ └── Button.tsx     # Componentes atómicos de UI
│ ├── data/
│ │ ├── CheckboxesTags.tsx # Autocomplete multi-select do MUI
│ │ └── ReusableForm.tsx   # Formulário genérico baseado em configuração (JSON Schema)
│ └── lists/
│ └── ListForm.tsx     # Exemplo de formulário com estilização Tailwind
│
├── pages/
│ └── HomePage.tsx     # Galeria principal de demonstração dos componentes
│
└── main.tsx           # Configuração raiz e inicialização


🚀 Componentes Destacados

1. ReusableForm (Formulário Genérico)

Criação de formulários complexos a partir de um array de configuração TypeScript (FieldConfig[]).

Suporte a validação básica e campos de tipos variados (text, email, select).

2. CheckboxesTags

Implementação do Autocomplete do MUI para seleção múltipla de itens como tags.

Utiliza ícones nativos do MUI para uma experiência visual familiar.

3. CustomDataTable (Adaptado)

Nota: Para garantir a portabilidade em ambientes de arquivo único, este componente foi adaptado para usar as Tabelas Padrão do MUI (TableContainer, Table, TableCell) em vez da dependência externa DataGrid (MUI X), mantendo a tipagem e estrutura de dados flexíveis.

4. Layout e Tema

Navbar funcional com suporte para alternância entre temas Claro e Escuro, persistindo a preferência do utilizador no ambiente local.

📦 Versão Atual

v2.0.0 — “Refatoração de Compilação e Foco em Autonomia”

Esta versão marca a refatoração completa do projeto para garantir a compilação em ambientes de arquivo único, eliminando dependências externas complexas (@mui/x-data-grid).

Melhorias Chave:

Estabilidade: Remoção de dependências problemáticas e substituição por soluções nativas do MUI.

Tipagem: Todos os componentes foram convertidos para a sintaxe .tsx, resolvendo problemas de tipagem e garantindo a compatibilidade com TypeScript.

Organização: Simplificação da estrutura para uma demonstração de galeria mais clara (HomePage.tsx).

👤 Autor

Willian Gomes
Desenvolvido com ❤️ e React + Tailwind