# Sistema de Agendamento de Salas

<img width="1365" height="783" alt="Print Sistema" src="https://github.com/user-attachments/assets/5926c560-1153-436a-ab8a-8f82b05cd111" />

---

## Descrição

Este projeto consiste em um Sistema de Agendamento de Salas desenvolvido
como parte de um desafio técnico.

A aplicação permite criar, listar, atualizar e remover agendamentos,
garantindo que não existam conflitos de horário para a mesma sala.

O backend foi desenvolvido em Java utilizando Spring Boot, e o frontend
foi implementado com React utilizando Vite.

---

## 🌐 Acesso Online (Sem instalação)

O sistema pode ser acessado diretamente pelo navegador:

### 🔗 Sistema (Frontend)

https://desafio-agendamento-one.vercel.app/

### 🔗 API REST (Backend)

https://agendamento-1nfo.onrender.com/agendamentos

---

## 🔐 Autenticação

A API utiliza Basic Authentication.

Credenciais padrão:

Usuário: admin  
Senha: admin123

---

## 🎥 Demonstração do sistema

https://www.youtube.com/watch?v=C8U6US3dxV4

---

## Tecnologias Utilizadas

### Backend

- Java 17
- Spring Boot
- Spring Security

### Frontend

- React
- Vite
- Fetch API

---

## Arquitetura do Backend

O backend foi organizado em camadas:

- model: Entidades do domínio
- service: Regras de negócio
- controller: Endpoints REST
- config: Segurança e CORS

Persistência em memória utilizando Map.

---

## Regra de Negócio

O sistema verifica conflitos de agendamento:

- mesma sala
- mesma data
- mesmo turno
- mesmo horário

Em caso de conflito retorna HTTP 400.

---

## Segurança

Autenticação Basic Auth.

Usuário: admin  
Senha: admin123

---

## API REST

### Agendamentos

GET /agendamentos  
GET /agendamentos/{id}  
POST /agendamentos  
PUT /agendamentos/{id}  
DELETE /agendamentos/{id}

### Salas

GET /salas

---

## Frontend

Permite:

- Visualizar agendamentos
- Criar agendamentos
- Editar agendamentos
- Excluir agendamentos

---

## Execução Local (Opcional)

### Backend

mvnw spring-boot:run

http://localhost:8080

### Frontend

npm install  
npm run dev

http://localhost:5173

---

## Observações

- Banco em memória
- Dados reiniciam ao reiniciar backend
- Sistema pode ser testado online pelo link
