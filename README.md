# Rocketseat SP 2019

Repositório utilizado no workshop sobre como desenvolver uma API com [Node.js](https://nodejs.org/) e [MongoDB](https://www.mongodb.com/) e o deploy no [Heroku](https://www.heroku.com/) usando uma imagem [Docker](https://www.docker.com/).


Funcionalidades:

- [x] Utilização do Typescript com as dependências [typescript](https://www.npmjs.com/package/typescript) e [ts-node](https://www.npmjs.com/package/ts-node).
- [x] Criação do serviço utilizando a dependência [express](https://www.npmjs.com/package/express).
- [x] Criação das rotas de GET, GET por id, POST, PUT e DELETE fazendo o CRUD no MongoDB.
- [x] Produtividade no desenvolvimento usando a dependência [nodemon](https://www.npmjs.com/package/nodemon).
- [x] Conexão com o banco de dados usando a dependência [mongoose](https://www.npmjs.com/package/mongoose) e o serviço gratuito do [MongoDB](#criação-e-configuração-do-mongodb).
- [x] Criação do esquema da coleção do banco de dados.
- [x] Separação do arquivo de configuração usando a dependência [config](https://www.npmjs.com/package/config).
- [x] Utilização do CORS com a dependência [cors](https://www.npmjs.com/package/cors).
- [x] Utilização do log com as dependências [winston](https://www.npmjs.com/package/winston) e [express-winston](https://www.npmjs.com/package/express-winston).
- [x] Utilização do lint com a dependência [eslint](https://www.npmjs.com/package/eslint).
- [x] Criação de testes com as dependências [jest](https://www.npmjs.com/package/jest) e [supertest](https://www.npmjs.com/package/supertest).
- [x] Criação de imagem [Docker](#criação-e-execução-de-uma-imagem-docker).
- [x] Deploy no [Heroku](#criação-e-execução-de-uma-imagem-docker).


## Pré-requisitos

### Aplicações

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)
* [MongoDB](https://www.mongodb.com/)

### Serviços

* [Heroku](https://www.heroku.com/)
* [MongoDB](https://www.mongodb.com/)


## Início

**1.** Clone o repositório.

```shell
git clone https://github.com/rodrigokamada/rocketseat-sp-2019.git
```

**2.** Instale as dependências.

```shell
npm install
```

**3.** Execute o lint.

```shell
npm run lint
```

**4.** Execute a aplicação usando o [Nodemon](https://nodemon.io/).

```shell
npm run start:dev
```


## Testes

### Testes automáticos

**1.** Execute os testes.

```shell
npm test
```

### Testes manuais

**1.** Fazer uma requisição na aplicação para listar.
```shell
curl -v "http://localhost:3000/v1/books"
```

**2.** Fazer uma requisição na aplicação para criar.
```shell
curl -v -X POST "http://localhost:3000/v1/books" \
-H "content-type: application/json" \
-d '{
  "title": "Some title",
  "author": "Some author"
}'
```

**3.** Fazer uma requisição na aplicação para alterar.
```shell
curl -v -X PUT "http://localhost:3000/v1/books/ID" \
-H "content-type: application/json" \
-d '{
  "title": "Some title 2",
  "author": "Some author 2"
}'
```

**4.** Fazer uma requisição na aplicação para apagar.
```shell
curl -v -X DELETE "http://localhost:3000/v1/books/ID"
```


## Transpilação e execução

**1.** Compilar/transpilar a aplicação.

```shell
npm run build
```

**2.** Execute a aplicação.

```shell
npm start
```


## Criação e configuração do MongoDB

**1.** Acessar a URL [www.mongodb.com](https://www.mongodb.com/) e clique no botão *Try Free* para criar uma nova conta.

**2.** No menu *Context*, clique no botão *New Project* para criar um novo projeto.

**2.1.** Preencha o nome do projeto e clique no botão *Next*. Na próxima página, clique no botão *Create Project*.

**3.** No menu *Atlas -> Clusters*, clique no botão *Build a Cluster*.

**3.1.** Selecione a opção grátis *Starter Clusters* e clique no botão *Create a cluster*.

**3.2.** Selecione o provedor da nuvem e a região e clique no botão *Create Cluster* para criar um cluster de MongoDB.

**4.** No menu *Security -> Network Access*, clique no botão *Add IP Address* para configurar o acesso de rede.

**4.1.** Preencha o IP *0.0.0.0/0* no campo *Whitelist Entry* e clique no botão *Confirm* para criar a configuração.

**5.** No menu *Security -> Database Access*, clique no botão *Add New User* para configurar um novo usuário.

**5.1.** Preencha os campos *username* e *password* e clique no botão *Add User*.

**6.** No menu *Atlas -> Clusters* novamente, verifique se o cluster do MongoDB foi criado e clique no botão *Connect*.

**6.1.** Clique em *Connect with the Mongo Shell* para copiar o comando de conexão ou clique em *Connect Your Application* para copiar a URL de conexão. A URL de conexão será configurada no arquivo `config/default.json` da aplicação.


## Criação e execução de uma imagem Docker

**1.** Criar a imagem.
```shell
docker build -t rocketseat-sp-2019 .
```

**2.** Executar a imagem exportando a porta da aplicação `3000` para a porta `8080`.
```shell
docker run -p 8080:3000 -d rocketseat-sp-2019
```

**3.** Fazer uma requisição na imagem em execução.
```shell
curl -v "http://localhost:8080/v1/books"
```


## Criação e implantação no Heroku

**1.** Acessar a URL [www.heroku.com](https://www.heroku.com/) e clique no botão *Sign Up for Free* para criar uma nova conta.

**2.** Instalar o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) na sua máquina.

**3.** Fazer o login do Heroku CLI. Caso a opção `-i` não seja informada, abrirá o navegador para fazer o login.
```shell
heroku login -i
```

**4.** Fazer o login no Container Registry do Heroku, onde a imagem Docker da aplicação será hospedada (repositório de imagem).
```shell
heroku container:login
```

**5.** Criar a aplicação no Heroku. A aplicação é única no Heroku independente do usuário.
```shell
heroku create rocketseat-sp-2019
```

**6.** Criar e enviar a imagem para o Container Registry do Heroku.
```shell
heroku container:push web
```

**7.** Publicar a imagem da aplicação.
```shell
heroku container:release web
```

**8.** Fazer uma requisição na aplicação criada no Heroku.
```shell
curl -v "https://rocketseat-sp-2019.herokuapp.com/v1/books" | jq
```
