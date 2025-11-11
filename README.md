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
│ │ └── ...
│ ├── data/
│ │ ├── **CustomDataTable.tsx** # Tabela de dados avançada e **Customizável** (MUI X)
│ │ └── CheckboxesTags.tsx # Campo de seleção múltipla com checkboxes (MUI Autocomplete)
│ └── lists/
│ │ └── ...
│
├── pages/
│ ├── HomePage.tsx # Página inicial com cards e alertas de exemplo
│ ├── **DataGridPage.tsx** # Página dedicada para visualização do CustomDataTable
│ └── lists/
│ └── ...
│
└── main.tsx # Configuração raiz do React e rotas

---

## 💡 Funcionalidades implementadas

- ✅ **Tema claro / escuro / sistema** com persistência em `localStorage`
- ✅ **Roteamento funcional** para `/list` e **`/data`** (Tabela).
- ✅ **Componente DataGrid (Tabela) customizado** com renderização avançada (`renderCell`) e barra de ferramentas (`slots`).
- ✅ **Componente Autocomplete Multi-Select** com caixas de seleção.
- ✅ **Resolução de problemas de tipagem com TypeScript (TS)** para componentes MUI.
- ✅ **Navbar com link ativo** para a nova rota `/data`.

---

## ⚙️ Instalação de Dependências

Para rodar este projeto e usar os componentes, você precisa instalar os seguintes pacotes:

```bash
# Core MUI (Material-UI)
npm install @mui/material @emotion/react @emotion/styled

# MUI X DataGrid (para DataTable)
npm install @mui/x-data-grid

# MUI Icons (para CheckboxesTags)
npm install @mui/icons-material
📦 Versão atual
v1.6.0 — “Full DataGrid Integration and Routing Fixes”

Inclui:

Refatoração do DataTable para CustomDataTable reutilizável.

Criação da página DataGridPage e integração de rotas (incluindo correção do bug de tela branca).

Implementação de renderização customizada (renderCell) e slots no DataGrid.

👨‍💻 Autor
Willian Gomes Desenvolvido com ❤️ e React + Tailwind