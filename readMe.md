# **Sistema de Biblioteca**

Este projeto é um sistema de gestão de biblioteca desenvolvido para administrar livros, usuários e empréstimos, com foco na eficiência. O *backend* é construído com **Node.js** e **TypeScript**, enquanto o *frontend* é desenvolvido com **React** e **TypeScript**.  
O sistema utiliza **Firebase Storage** para armazenar e gerenciar imagens de forma segura.  
---

## **Estrutura do Projeto**

O repositório está organizado nas seguintes pastas:

* **backend**: Contém o código do servidor desenvolvido com Node.js e TypeScript.  
* **frontend**: Contém a aplicação cliente desenvolvida com React e TypeScript.

---

## **Instalação e Configuração**

### **Requisitos Prévios**

* **Node.js** (versão 16 ou superior).  
* **npm** ou **yarn** para gerenciar dependências.  
* **TypeScript** instalado globalmente (opcional).  
* **Firebase** configurado para lidar com o armazenamento de imagens.

### **Backend**

**Instalação de dependências:**

```
cd backend  
npm install
```


### **Configuração do Firebase Service Account**

Para que o servidor possa acessar o Firebase Storage, você precisa gerar um arquivo de credenciais:

1. Acesse o **console do Firebase** e navegue até **Configurações do Projeto \> Contas de Serviço**.  
2. Clique em **Gerar nova chave privada**. Isso fará o download de um arquivo JSON.  
3. Renomeie o arquivo baixado para **services-account.json**.  
4. Coloque o arquivo **services-account.json** na pasta backend/src/config/.

**Configuração de variáveis de ambiente:**  
Crie um arquivo .env na pasta backend e adicione as seguintes variáveis com seus valores:



```
URL\_BDMONGO=\<URL\_DE\_SUA\_BASE\_DE\_DADOS\_MONGODB\>  
JWT\_SECRET=\<SEU\_SEGREDO\_JWT\>  
FIREBASE\_STORAGE\_BUCKET=\<SEU\_BUCKET\_DE\_FIREBASE\>  
GOOGLE\_APPLICATION\_CREDENTIALS=./src/config/services-account.json  
PORT=\<PORTA A SER USADA\>
```
**Execução do servidor:**  
Para iniciar em modo desenvolvimento:

```
npm run dev
```

Para compilar e executar:

```
npm run build  
npm start
```

### **Frontend**

**Instalação de dependências:**

Bash

```
cd frontend  
npm install
```

**Execução do cliente:**  
Inicia o servidor de desenvolvimento:

```
npm run dev
```

---

## **Tecnologias Utilizadas**

### **Backend**

* **Node.js** e **TypeScript**.  
* **Express** para criar o servidor.  
* **Mongoose** para a conexão com **MongoDB**.  
* **Firebase** para gerenciar imagens.  
* **JWT** (JSON Web Tokens) para autenticação segura.  
* **Multer** para a subida de arquivos.

### **Frontend**

* **React** e **TypeScript**.  
* **TailwindCSS** para o design da interface.  
* **React Router** para o gerenciamento de rotas.  
* **Axios** para as solicitações HTTP.  
* **Date-fns** para o manejo de datas.

---

## **Descrição do Desenvolvimento**

O sistema de biblioteca foi projetado para fornecer uma solução moderna para a gestão bibliotecária.

### **Backend**

* Desenvolvido com Node.js e TypeScript para garantir um código robusto e tipado.  
* Implementa JWT para autenticação e protege as rotas sensíveis.  
* Integra **Firebase Storage** para o gerenciamento de imagens e **Multer** para a subida de arquivos.

### **Frontend**

* Criado com React e TypeScript, com um design responsivo utilizando TailwindCSS.  
* Consome a API do backend através do **Axios**.  
* Implementa uma experiência de usuário fluida com **React Router** e componentes reutilizáveis.

---

## **Próximos Passos**

* Melhorar o sistema de notificações para os usuários.  
* Adicionar funcionalidades avançadas como geração de relatórios.  
* Otimizar o desempenho geral do sistema.