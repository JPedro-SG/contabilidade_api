# Descrição do Teste Técnico — Desenvolvedor FullStack

## Objetivo

Construir uma API em Node.js puro (http) ou qualquer biblioteca HTTP (Express, Fastify, etc.), que consuma dados de um banco de dados SQLite e permita realizar operações básicas de cadastro e consulta.

## Requisitos obrigatórios

### Tecnologia:

- A API deve ser criada utilizando Node.js puro (módulo http) ou qualquer biblioteca HTTP (ex.: Express, Fastify, Hapi etc.).

### Banco de dados:

- Utilizar SQLite como banco de dados.

- O banco deve possuir duas tabelas:
  - **produtos** (campos mínimos: id, nome, preço, estoque, data de criação)
  - **clientes** (campos mínimos: id, nome, email, data de criação)

### Rotas obrigatórias:

- **POST /produtos** → cadastrar um produto
- **GET /produtos** → listar produtos (com possibilidade de consulta por parâmetros simples, ex.: busca ou paginação)
- **GET /produtos/:id** → buscar produto pelo ID
- **POST /clientes** → cadastrar um cliente
- **GET /clientes** → listar clientes
- **GET /clientes/:id** → buscar cliente pelo ID

### Validações mínimas:

- Não permitir cadastro de produto sem nome ou preço.
- Não permitir cadastro de cliente sem nome ou email.
- Emails devem ser únicos.

### Entrega:

- Fornecer instruções de execução do projeto (ex.: npm install, npm start).
- O banco pode ser entregue com script de criação (SQL).
- Publique o código-fonte em um **repositório público** (GitHub, GitLab ou Bitbucket).
- Inclua esse **README.md** na raiz do repositório, com o checklist abaixo preenchido.
- Envie **apenas o link do repositório** como resposta final.

## ✅ Checklist do Teste Técnico

- [X] Criar uma **API em Node.js** usando:

  - Node.js puro (`http`) **ou** qualquer biblioteca HTTP (Express, Fastify, etc.)

- [X] Utilizar **SQLite** como banco de dados

- [X] Criar duas tabelas no banco:

  - **produtos** → id, nome, preço, estoque, data de criação
  - **clientes** → id, nome, email, data de criação

- [X] Implementar rotas de **cadastro**:

  - `POST /produtos` → cadastrar produto
  - `POST /clientes` → cadastrar cliente

- [X] Implementar rotas de **consulta**:

  - `GET /produtos` → listar produtos (com paginação ou busca simples)
  - `GET /produtos/:id` → buscar produto por ID
  - `GET /clientes` → listar clientes
  - `GET /clientes/:id` → buscar cliente por ID

- [X] Regras de **validação**:

  - Produto deve ter nome e preço obrigatórios
  - Cliente deve ter nome e email obrigatórios
  - Email de cliente deve ser **único**

- [X] Entregar junto instruções claras de como rodar a API:
  - Instalação de dependências (`npm install`)
  - Adicione o DATABASE_NAME no arquivo .env
  - Criação do banco de dados. (`npm run seed`)
  - Execução do projeto (`npm start`)
  - Execução dos testes (`npm run test`)
  - Nota: Os endpoints foram trocados para /products e /clients para manter consistência de idioma. Caso isso não seja válido, por favor troque os nomes para /produtos e /clientes em index.js.