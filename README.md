# 📦 Sistema de Compras — Migrations

Este documento descreve a estrutura de tabelas e o uso de **migrations** no sistema de compras.

## 📌 O que são migrations?

As *migrations* permitem versionar e gerenciar a estrutura do banco de dados de forma segura, garantindo que todos os ambientes (desenvolvimento, teste e produção) utilizem a mesma base de dados.

---

## 🗄️ Tabelas do Sistema

### 1. **users**
Armazena informações dos usuários do sistema.

| Campo       | Tipo         | Restrições                   |
|-------------|-------------|------------------------------|
| id          | UUID        | PK, auto-gerado               |
| nome        | VARCHAR(255)| NOT NULL                      |
| email       | VARCHAR(255)| NOT NULL, UNIQUE              |
| senha_hash  | TEXT        | NOT NULL                      |
| cargo       | VARCHAR(50) | NOT NULL                      |
| criado_em   | TIMESTAMP   | DEFAULT NOW()                 |

---

### 2. **materiais**
Lista de materiais cadastrados para compra.

| Campo       | Tipo         | Restrições                   |
|-------------|-------------|------------------------------|
| id          | UUID        | PK, auto-gerado               |
| nome        | VARCHAR(255)| NOT NULL                      |
| unidade     | VARCHAR(50) | NOT NULL                      |
| preco       | DECIMAL(10,2)| NOT NULL                      |
| criado_em   | TIMESTAMP   | DEFAULT NOW()                 |

---

### 3. **pedidos**
Tabela principal de pedidos de compra.

| Campo         | Tipo         | Restrições                   |
|---------------|-------------|------------------------------|
| id            | UUID        | PK, auto-gerado               |
| data_solicit  | TIMESTAMP   | DEFAULT NOW()                 |
| solicitante_id| UUID        | FK -> users.id                |
| cliente       | VARCHAR(255)| NOT NULL                      |
| status        | VARCHAR(50) | DEFAULT 'pendente'            |

---

### 4. **itens_pedido**
Itens vinculados a um pedido.

| Campo         | Tipo         | Restrições                   |
|---------------|-------------|------------------------------|
| id            | UUID        | PK, auto-gerado               |
| pedido_id     | UUID        | FK -> pedidos.id              |
| material_id   | UUID        | FK -> materiais.id            |
| quantidade    | DECIMAL(10,2)| NOT NULL                     |
| preco_unit    | DECIMAL(10,2)| NOT NULL                     |


