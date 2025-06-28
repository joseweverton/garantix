DROP TABLE IF EXISTS processos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS niveis_acesso;

-- Tabela de níveis de acesso (ex: baixo, medio, alto)
CREATE TABLE niveis_acesso (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(30) NOT NULL
);
-- tabela status (Ex: Em andamento, Pendente, devolvido)
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

-- Tabela de usuários (depois das tabelas referenciadas)
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL unique,
  senha VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT false,
  situacao BOOLEAN NOT NULL DEFAULT true,
  nivel_acesso_id INTEGER NOT NULL REFERENCES niveis_acesso(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Tabela de processos (depois das tabelas referenciadas)
CREATE TABLE processos (
  id_processo SERIAL PRIMARY KEY,
  solicitante VARCHAR(100) NOT NULL,
  responsavel INTEGER REFERENCES usuarios(id),
  status_id INTEGER REFERENCES status(id)
);

-- Populando níveis de acesso
INSERT INTO niveis_acesso (nome) VALUES ('Baixo'), ('Medio'), ('Alto');

-- Populando usuários
INSERT INTO usuarios (nome, email, senha, admin, situacao, nivel_acesso_id) 
VALUES 
  ('José', 'jose@email.com', 'senha123', true, true, 3),
  ('Maria', 'maria@email.com', 'senha123', false, true, 1),
  ('João', 'joao@email.com', 'senha123', true, true, 2),
  ('Carlos', 'carlos@email.com', 'senha123', false, true, 1);

-- Populando status
INSERT INTO status (nome) VALUES ('Em andamento'), ('Concluído'), ('Devolvido'), ('Pendente'), ('Incluso'), ('Não iniciado'), ('Não atribuido'), ('Vencido');

-- Populando processos
INSERT INTO processos (solicitante, responsavel, status_id) VALUES 
  ('Julio Cesar', 1, 1),   -- José responsável, status: Em andamento
  ('Aline Menezes', 2, 2),   -- Maria responsável, status: Concluído
  ('Afonso Aguiar', 3, 4), -- João responsável, status: Pendente
  ('Amanda Dias', 4, 3);   -- Carlos responsável, status: Devolvido
