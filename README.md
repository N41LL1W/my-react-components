# 🧩 My React Components

Um projeto de componentes reutilizáveis em **React + TypeScript**, criado com **Vite** e estilizado com **Tailwind CSS**.  
Inclui suporte a **tema claro/escuro**, **listas dinâmicas**, **cabeçalho fixo**, e **estrutura modular de páginas**.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React 18 + TypeScript**
- ⚡ **Vite**
- 🎨 **Tailwind CSS**
- 🌗 **Theme Context (Dark / Light Mode)**
- 🧭 **React Router DOM**
- 🧱 **Componentes reutilizáveis (List, Button, Input, etc.)**

---

## 📂 Estrutura do Projeto

src/
├── assets/
│ └── react.svg
├── components/
│ ├── List/
│ │ └── List.tsx
│ ├── ThemeSwitcher.tsx
│ └── ...
├── context/
│ └── ThemeContext.tsx
├── pages/
│ ├── HomePage.tsx
│ ├── ListPage.tsx
│ ├── ListCreatePage.tsx
│ └── ListManagePage.tsx
├── ui/
│ ├── Button.tsx
│ └── Input.tsx
├── App.tsx
├── main.tsx
└── index.css

yaml
Copiar código

---

## 💡 Funcionalidades

✅ Alternância entre **tema claro e escuro**  
✅ Suporte ao **modo do sistema operacional**  
✅ Componente de **lista genérica** e **otimizada para grandes volumes**  
✅ **Cabeçalho fixo** com navegação entre páginas  
✅ Layout **responsivo e moderno**, baseado em Tailwind  
✅ Deploy automático na **Vercel**

---

## ⚙️ Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/my-react-components.git
Acesse a pasta:

bash
Copiar código
cd my-react-components
Instale as dependências:

bash
Copiar código
npm install
Execute o projeto em modo de desenvolvimento:

bash
Copiar código
npm run dev
Acesse no navegador:

arduino
Copiar código
http://localhost:5173
🧱 Comandos Importantes
Criar build de produção:
bash
Copiar código
npm run build
Visualizar build localmente:
bash
Copiar código
npm run preview
Rodar lint:
bash
Copiar código
npm run lint
☁️ Deploy
Este projeto está configurado para deploy automático na Vercel.
A cada git push na branch principal (main), a Vercel:

Detecta o commit

Executa o build (npm run build)

E publica a nova versão automaticamente 🚀

🧾 Licença
Licenciado sob a MIT License.
Criado e mantido com 💙 por Willian Gomes.

🌟 Créditos
Inspirado em boas práticas de arquitetura React moderna com Vite + Tailwind + Context API.
Ideal para quem deseja criar bibliotecas de componentes ou projetos escaláveis em React.