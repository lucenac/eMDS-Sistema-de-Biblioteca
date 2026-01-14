# 📚 Sistema de Biblioteca (eMDS)

> Uma plataforma moderna e eficiente para gestão de bibliotecas, empréstimos e acervo digital.

![Logo](frontend/src/assets/svg/logo.svg)

## 🚀 Sobre o Projeto

Este sistema foi desenvolvido para facilitar a administração de uma biblioteca, permitindo que **Administradores** gerenciem o acervo e usuários, enquanto **Estudantes** podem consultar livros, realizar empréstimos e acompanhar seu histórico.

O projeto utiliza uma arquitetura moderna com **React (Vite)** no Frontend e **Node.js (Express)** no Backend, com autenticação híbrida via JWT e Google Firebase.

---

## ✨ Funcionalidades Principais

### 👤 Área do Estudante
*   **Catálogo Interativo:** Busca avançada de livros por título, autor ou categoria com filtros dinâmicos.
*   **Empréstimos:** Visualização de empréstimos ativos e prazos de devolução.
*   **Histórico:** Registro completo de todos os livros já lidos.
*   **Perfil & Favoritos:** Gerenciamento de dados pessoais e lista de leitura.

### 🛡️ Área do Administrador
*   **Dashboard:** Visão geral com métricas (Total de usuários, livros, empréstimos ativos).
*   **Gestão de Livros:** CRUD completo com upload de imagens de capa.
*   **Gestão de Usuários:** Controle de alunos cadastrados.
*   **Controle de Empréstimos:** Aprovação de retiradas e registro de devoluções.

### 🔐 Autenticação & Segurança
*   Login tradicional (Email/Senha) com JWT.
*   **Login Social com Google** (Firebase Auth).
*   Proteção de rotas por níveis de acesso (Role-based access control).
*   Persistência de sessão segura.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
-   **React** + **TypeScript** + **Vite** (Alta performance)
-   **Tailwind CSS** (Estilização moderna e responsiva)
-   **Context API** (Gerenciamento de estado global)
-   **React Router Dom** (Navegação SPA)
-   **Firebase SDK** (Autenticação Google no cliente)
-   **Lucide React** & **Heroicons** (Ícones)

### Backend
-   **Node.js** + **Express**
-   **TypeScript** (Segurança de tipos)
-   **MongoDB** + **Mongoose** (Banco de dados NoSQL)
-   **Multer** (Upload de arquivos/capas)
-   **Firebase Admin SDK** (Validação de tokens Google)
-   **Bcryptjs** & **JWT** (Criptografia e Tokens)

---

## ⚙️ Instalação e Configuração

### Pré-requisitos
*   Node.js (v18+)
*   MongoDB (Atlas ou Local)
*   Conta no Firebase (para Login Google)

### 1. Configuração do Backend

1.  Acesse a pasta:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o arquivo `.env` (crie na raiz de `backend/`):
    ```env
    PORT=8000
    URL_BDMONGO=sua_string_de_conexao_mongodb
    JWT_SECRET=seu_segredo_super_secreto
    GOOGLE_APPLICATION_CREDENTIALS=./src/config/services-account.json
    FIREBASE_STORAGE_BUCKET=seu-app.appspot.com
    BASE_URL=http://localhost:8000
    ```
4.  **Firebase Admin SDK:**
    *   Baixe a chave privada do seu projeto Firebase (Project Settings > Service Accounts).
    *   Salve como `services-account.json` em `backend/src/config/`.

5.  **Inicialize o Banco de Dados (Seed):**
    *   Para criar o usuário admin padrão e livros de exemplo:
    ```bash
    npm run seed
    ```
    *   *Admin Padrão:* `admin@library.com` / `admin123`

6.  Inicie o servidor:
    ```bash
    npm run dev
    ```

### 2. Configuração do Frontend

1.  Acesse a pasta:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o arquivo `.env` (crie na raiz de `frontend/`):
    ```env
    VITE_API_KEY=sua_firebase_api_key
    VITE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
    VITE_PROJECT_ID=seu_project_id
    VITE_STORAGE_BUCKET=seu_bucket.appspot.com
    VITE_MESSAGING_SENDER_ID=seu_sender_id
    VITE_APP_ID=seu_app_id
    ```
4.  Inicie a aplicação:
    ```bash
    npm run dev
    ```

---

## 📂 Estrutura de Pastas

```
eMDS-Sistema-de-Biblioteca/
├── backend/                # API Node.js
│   ├── src/
│   │   ├── config/         # Configuração de DB, Multer, Firebase
│   │   ├── controllers/    # Lógica de negócios
│   │   ├── middleware/     # Auth e validações
│   │   ├── models/         # Schemas do Mongoose (User, Book, Loan)
│   │   ├── routes/         # Rotas da API
│   │   └── index.ts        # Entry point
│   └── uploads/            # Armazenamento local de imagens
│
└── frontend/               # Aplicação React
    ├── src/
    │   ├── assets/         # Imagens e ícones
    │   ├── components/     # Componentes reutilizáveis (UI)
    │   ├── contexts/       # Auth e Cart Context
    │   ├── layouts/        # Layouts de Admin e User
    │   ├── pages/          # Páginas da aplicação
    │   └── services/       # Integração com API
    └── ...
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.