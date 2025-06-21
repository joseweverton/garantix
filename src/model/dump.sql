CREATE DATABASE api_projeto;

-- Exclui as tabelas na ordem correta
DROP TABLE IF EXISTS processos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS situacao;
DROP TABLE IF EXISTS niveis_acesso;

-- Tabela de situações (ex: ativo, inativo)
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(20) NOT NULL
);

-- Tabela de níveis de acesso (ex: baixo, medio, alto)
CREATE TABLE niveis_acesso (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(30) NOT NULL
);
-- tabela situação (Ex: Em andamento, Pendente)
CREATE TABLE situacao (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Tabela de usuários (depois das tabelas referenciadas)
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL unique,
  senha VARCHAR(255) NOT NULL,
  funcao VARCHAR(50) NOT NULL,
  situacao_id INTEGER NOT NULL REFERENCES situacao(id),
  nivel_acesso_id INTEGER NOT NULL REFERENCES niveis_acesso(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Tabela de processos (depois das tabelas referenciadas)
CREATE TABLE processos (
  id_processo SERIAL PRIMARY KEY,
  solicitante VARCHAR(100) NOT NULL,
  responsavel INTEGER REFERENCES usuarios(id),
  situacao INTEGER REFERENCES status(id)
);

-- Populando situações
INSERT INTO situacao (nome) VALUES ('Ativo'), ('Inativo');

-- Populando níveis de acesso
INSERT INTO niveis_acesso (nome) VALUES ('Baixo'), ('Medio'), ('Alto');

-- Populando usuários
INSERT INTO usuarios (nome, email, senha, funcao, situacao_id, nivel_acesso_id) 
VALUES 
  ('José', 'jose@email.com', 'senha123', 'Gerente', 1, 3),
  ('Maria', 'maria@email.com', 'senha123', 'Assistente', 1, 1),
  ('João', 'joao@email.com', 'senha123', 'Analista', 1, 2),
  ('Carlos', 'carlos@email.com', 'senha123', 'Analista', 2, 1);

-- Populando status
INSERT INTO status (nome) VALUES ('Em andamento'), ('Concluído'), ('Devolvido'), ('Pendente'), ('Incluso'), ('Não iniciado'), ('Não atribuido'), ('Vencido');

-- Populando processos
INSERT INTO processos (solicitante, responsavel, situacao) VALUES 
  ('Julio Cesar', 1, 1),   -- José responsável, status: Em andamento
  ('Aline Menezes', 2, 2),   -- Maria responsável, status: Concluído
  ('Afonso Aguiar', 3, 4), -- João responsável, status: Pendente
  ('Amanda Dias', 4, 3);   -- Carlos responsável, status: Devolvido
