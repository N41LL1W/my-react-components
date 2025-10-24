# ⚛️ My React Components

Projeto desenvolvido com **React + Vite + TypeScript + TailwindCSS**, com foco em **componentização**, **tema dinâmico (claro/escuro)** e **boas práticas de interface**.

---

## 🚀 Funcionalidades Principais

✅ Interface moderna com **modo claro/escuro automático**  
✅ Sistema de **componentes reutilizáveis** (`Card`, `Button`, `Alert`, `Modal`)  
✅ Página inicial interativa com modais e alertas  
✅ Página de **listas dinâmicas** (`ListPage`) com formulário integrado (`ListForm`)  
✅ Totalmente documentado com comentários padronizados e claros

---

## 🧩 Estrutura de Pastas

src/
├── components/
│ ├── layout/
│ │ ├── Navbar.tsx
│ │ └── Header.tsx
│ ├── lists/
│ │ └── ListForm.tsx
│ └── ui/
│ ├── Button.tsx
│ ├── Card.tsx
│ ├── Modal.tsx
│ └── Alert.tsx
├── pages/
│ ├── HomePage.tsx
│ └── lists/
│ └── ListPage.tsx
└── main.tsx

yaml
Copiar código

---

## ⚙️ Tecnologias Utilizadas

| Categoria | Ferramenta |
|------------|-------------|
| Framework | [React](https://react.dev) |
| Build Tool | [Vite](https://vitejs.dev) |
| Linguagem | TypeScript |
| Estilo | [Tailwind CSS](https://tailwindcss.com) |
| UI Components | Customizados (Button, Card, Modal, Alert) |

---

## 💡 Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:5173
🧠 Principais Componentes
🔹 HomePage
Página inicial que demonstra:

Uso de Card, Modal e Alert

Sistema de botões com feedback visual

Navegação direta para a página de listas (ListPage)

🔹 ListPage
Gerenciador de itens simples (em memória):

Adiciona novos itens via ListForm

Exibe mensagens de sucesso

Apresenta cada item em um Card elegante

🔹 ListForm
Formulário reutilizável:

Campos controlados (name, description)

Validação simples

Botões de ação (Salvar e Cancelar)

🧱 Boas Práticas Aplicadas
Comentários padronizados (🔹, 🔸, 🧠, etc.)

Componentes independentes e reutilizáveis

Padrão Functional Components + Hooks

Código tipado com TypeScript

Layout responsivo com TailwindCSS

🌙 Tema Dinâmico
O projeto adapta automaticamente o tema:

🌞 Claro

🌙 Escuro

🖥️ Automático (baseado no sistema)

🧭 Navegação
Página	Caminho	Descrição
Home	/	Demonstração dos componentes e alertas
Lista	/list	Gerenciamento de itens (ListPage + ListForm)