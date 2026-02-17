# Sistema de Agendamento de Salas

## Descrição

Este projeto consiste em um Sistema de Agendamento de Salas desenvolvido
como parte de um desafio técnico.

A aplicação permite criar, listar, atualizar e remover agendamentos,
garantindo que não existam conflitos de horário para a mesma sala.

O backend foi desenvolvido em Java utilizando Spring Boot, e o frontend
foi implementado com React utilizando Vite.

------------------------------------------------------------------------

## Tecnologias Utilizadas

### Backend

```{=html}
<p>
```
`<img src="https://skillicons.dev/icons?i=java" height="40"/>`{=html}
`<img src="https://skillicons.dev/icons?i=spring" height="40"/>`{=html}
```{=html}
</p>
```
-   Java\
-   Spring Boot\
-   Spring Security (Basic Authentication)

### Frontend

```{=html}
<p>
```
`<img src="https://skillicons.dev/icons?i=react" height="40"/>`{=html}
`<img src="https://skillicons.dev/icons?i=vite" height="40"/>`{=html}
`<img src="https://skillicons.dev/icons?i=javascript" height="40"/>`{=html}
```{=html}
</p>
```
-   React\
-   Vite\
-   Fetch API

------------------------------------------------------------------------

## Arquitetura do Backend

O backend foi organizado em camadas:

-   **model**: Entidades do domínio (`Sala` e `Agendamento`)\
-   **service**: Regras de negócio e armazenamento em memória\
-   **controller**: Endpoints REST\
-   **config**: Configuração de segurança e CORS

A persistência foi implementada em memória utilizando `Map`
(`LinkedHashMap`).

As salas foram mockadas e disponibilizadas apenas para listagem.

------------------------------------------------------------------------

## Regra de Negócio

Antes de salvar ou atualizar um agendamento, o sistema verifica se já
existe outro registro com:

-   mesma sala\
-   mesma data\
-   mesmo turno\
-   mesmo horário

Em caso de conflito, a API retorna erro HTTP 400.

------------------------------------------------------------------------

## Segurança

A autenticação foi implementada utilizando Spring Security com Basic
Authentication.

Credenciais padrão:

-   Usuário: `admin`
-   Senha: `admin123`

Requisições sem autenticação retornam HTTP 401 (Unauthorized).

------------------------------------------------------------------------

## API REST

### Agendamentos

-   `GET /agendamentos` -- Listar todos os agendamentos\
-   `GET /agendamentos/{id}` -- Buscar agendamento por ID\
-   `POST /agendamentos` -- Criar novo agendamento\
-   `PUT /agendamentos/{id}` -- Atualizar agendamento existente\
-   `DELETE /agendamentos/{id}` -- Remover agendamento

### Salas

-   `GET /salas` -- Listar salas disponíveis (dados mockados)

As respostas são retornadas em formato JSON com os respectivos status
codes HTTP.

------------------------------------------------------------------------

## Frontend

O frontend foi desenvolvido em React e consome os endpoints da API por
meio da função `fetch`.

A interface permite:

-   Visualizar agendamentos\
-   Criar novos registros\
-   Atualizar registros existentes\
-   Excluir agendamentos

Os dados retornados pelo backend são utilizados para atualizar o estado
da aplicação.

------------------------------------------------------------------------

## Execução do Projeto

### Backend

1.  Localizar a pasta do projeto Backend\
2.  Executar:

```{=html}
<!-- -->
```
    mvn spring-boot:run

A aplicação será iniciada em:

    http://localhost:8080

### Frontend

1.  Localizar a pasta do projeto Frontend\
2.  Executar:

```{=html}
<!-- -->
```
    npm install
    npm run dev

A aplicação será iniciada em:

    http://localhost:5173

------------------------------------------------------------------------

## Observações

-   A persistência é realizada em memória.\
-   Os dados são reiniciados a cada execução da aplicação.\
-   O projeto foi mantido simples e funcional conforme o escopo do
    desafio técnico.
