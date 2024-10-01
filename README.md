
### CRUD Application - Cyber1 Cadastro

Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) com Angular no front-end e PHP no back-end, utilizando MySQL como banco de dados. Ele permite a criação, leitura, atualização e exclusão de registros por meio de uma interface amigável, com a comunicação entre frontend e backend via API REST.

## Funcionalidades do Frontend
- Listagem de registros: Visualização de todos os registros existentes no sistema.
- Formulário de criação/edição: Interface para criar ou atualizar registros.
- Exclusão de registros: Botão para remover registros.
- Validações de formulário: Implementação de validações para garantir a entrada correta de dados.

### A aplicação está hospedada no vercel e pode ser acessada por este link:
- https://cyber1-cadastro.vercel.app/

- GitHub API: https://github.com/asfuture/api-php
  
## Tecnologias Utilizadas

- Angular 18.2.3
- Node v21.6.1
- HTML5
- CSS3
- BootStrap5
- TypeScript
- RxJS
  
### Arquitetura
-  MVVM 

### Pré-requisitos

- Node.js (v21.6.1)
- Angular CLI

### Passos para Rodar o Projeto Localmente
1. Clone o repositório:
    ```bash
    git clone git@github.com:asfuture/cyber1-cadastro.git
    cd cyber1-cadastro
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Rode a aplicação:
    ```bash
    ng serve
    ```
4. Acesse a aplicação no navegador:
    ```
    http://localhost:4200
    ```
## Utilizando Docker
### Passos para Baixar a imagem Docker

1. Para baixar a imagem Docker da aplicação, utilize o comando:

```bash
docker pull asfuture/cyber1cadastro:latest
```

2. Para rodar a aplicação usando Docker, utilize o comando:

```bash
docker run -p 8080:80 asfuture/cyber1cadastro:latest
```

3. Acesse a aplicação no navegador:
   
http://localhost:8080

#### Autor: Alex Ferreira

