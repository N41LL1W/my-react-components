# 🧩 MyReactComponents — Projeto de Componentes Modernos com React + Tailwind

## 🚀 Descrição
Este projeto é um playground para criação de **componentes React reutilizáveis**, com suporte a **tema claro/escuro**, **animações suaves**, e **design responsivo** via Tailwind CSS.

Atualmente o projeto possui um **sistema completo de listas e itens**, além de componentes utilitários prontos para uso.

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
│ └── lists/
│ ├── ListForm.tsx # Formulário para criar listas ou itens
│ └── ...
│
├── pages/
│ ├── HomePage.tsx # Página inicial com cards e alertas de exemplo
│ └── lists/
│ └── ListPage.tsx # Página de gerenciamento de listas e itens
│
└── main.tsx # Configuração raiz do React e rotas

yaml
Copiar código

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
- ✅ **Padrão de código comentado e organizado**

---

## ⚙️ Requisitos

- Node.js 18+
- NPM ou Yarn

---

## 🧑‍💻 Comandos principais

### Instalar dependências
```bash
npm install
Rodar o projeto localmente
bash
Copiar código
npm run dev
Gerar build de produção
bash
Copiar código
npm run build
Analisar e corrigir problemas TypeScript
bash
Copiar código
npm run type-check
🧠 Padrões de desenvolvimento
Todos os componentes devem conter comentários explicativos.

Utilizar Tailwind CSS para estilo (sem CSS externo).

Responsividade obrigatória para telas pequenas e médias.

Novos componentes devem seguir o padrão de pastas ui/ ou layout/.

🧩 Próximas etapas
✏️ Editar / Excluir listas e itens

💾 Persistência de dados com LocalStorage

🔄 Filtros e busca entre listas

🧭 Breadcrumbs e rotas nomeadas

📦 Versão atual
v1.4.0 — “Interactive Components Update”

Inclui:

Tooltip com animação suave

Navbar unificada e tema global

Listas com estrutura hierárquica funcional

Código revisado e comentado integralmente

👨‍💻 Autor
Willian Gomes
Desenvolvido com ❤️ e React + Tailwind