# 🧩 MyReactComponents — Projeto de Componentes Modernos com React + Tailwind + MUI

## 🚀 Descrição
Este projeto é um playground para criação de **componentes React reutilizáveis**, com suporte a **tema claro/escuro**, **animações suaves**, e **design responsivo** via Tailwind CSS. O projeto agora integra **componentes avançados do Material-UI (MUI)** para funcionalidades complexas de interface.

Atualmente o projeto possui um **sistema completo de listas e itens**, além de componentes utilitários e de dados prontos para uso.

---

## 🧱 Estrutura principal

src/
├── components/
│ ├── layout/
│ │ └── Navbar.tsx # Barra de navegação global com alternância de tema
│ ├── ui/
│ │ ├── Button.tsx # Botão estilizado com variantes
│ │ ├── Card.tsx # Cartão visual com título e rodapé
│ │ ├── Modal.tsx # Janela modal com sobreposição
│ │ ├── Alert.tsx # Alerta visual com ícones e cores por tipo
│ │ ├── Tooltip.tsx # Dica visual (hover) com animação suave ✨
│ ├── data/
│ │ ├── **DataTable.tsx** # Tabela de dados avançada com paginação/filtro (MUI X)
│ │ └── **CheckboxesTags.tsx** # Campo de seleção múltipla com checkboxes (MUI Autocomplete)
│ └── lists/
│ │ ├── ListForm.tsx # Formulário para criar listas ou itens
│ │ └── ...
│
├── pages/
│ ├── HomePage.tsx # Página inicial com cards e alertas de exemplo
│ └── lists/
│ └── ListPage.tsx # Página de gerenciamento de listas e itens
│
└── main.tsx # Configuração raiz do React e rotas

---

## 💡 Funcionalidades implementadas

- ✅ **Tema claro / escuro / sistema** com persistência em `localStorage`
- ✅ **Navbar responsiva** com alternância de tema e links ativos
- ✅ **Alertas informativos e dinâmicos** com botão de fechamento
- ✅ **Modal interativo** e adaptável ao tema
- ✅ **Sistema completo de Listas**
  - Criar múltiplas listas
  - Adicionar itens dentro de listas específicas
  - Mensagens de sucesso automáticas
- ✅ **Tooltip com animação suave** (novo)
- ✅ **Componente DataGrid (Tabela) funcional** com paginação e seleção de linhas. (Novo)
- ✅ **Componente Autocomplete Multi-Select** com caixas de seleção. (Novo)
- ✅ **Padrão de código comentado e organizado**

---

## ⚙️ Requisitos e Instalação

### Requisitos
- Node.js 18+
- NPM ou Yarn

### Instalação de Dependências
Além das dependências básicas (React/Tailwind), é necessário instalar os pacotes do Material-UI (MUI) e suas extensões para os novos componentes:

```bash
# Core MUI (Material-UI)
npm install @mui/material @emotion/react @emotion/styled

# MUI X DataGrid (para DataTable)
npm install @mui/x-data-grid

# MUI Icons (para CheckboxesTags)
npm install @mui/icons-material
🧑‍💻 Comandos principais
Instalar dependências
Bash

npm install
Rodar o projeto localmente
Bash

npm run dev
Gerar build de produção
Bash

npm run build
Analisar e corrigir problemas TypeScript
Bash

npm run type-check
🧠 Padrões de desenvolvimento
Todos os componentes devem conter comentários explicativos.

Utilizar Tailwind CSS para estilo (sem CSS externo, exceto onde o MUI é obrigatório).

Responsividade obrigatória para telas pequenas e médias.

Novos componentes devem seguir o padrão de pastas ui/, layout/ ou data/.

🧩 Próximas etapas
✏️ Editar / Excluir listas e itens

💾 Persistência de dados com LocalStorage

🔄 Tornar DataTable e CheckboxesTags reutilizáveis via props (Dados dinâmicos)

🔄 Filtros e busca entre listas

🧭 Breadcrumbs e rotas nomeadas

📦 Versão atual
v1.5.0 — “Data Integration Update (MUI)”

Inclui:

Implementação do DataTable (MUI X DataGrid)

Implementação do CheckboxesTags (MUI Autocomplete)

Estrutura de pastas atualizada para components/data/

Resolução de problemas de tipagem com TypeScript (verbatimModuleSyntax e valueGetter).

👨‍💻 Autor
Willian Gomes Desenvolvido com ❤️ e React + Tailwind