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

CREATE TABLE processos (
  id SERIAL PRIMARY KEY,
  id_processo BIGINT NOT NULL,
  data_abertura TIMESTAMP NOT NULL,
  aberto_por TEXT NOT NULL,
  nome_arquivo TEXT NOT NULL,
  data_importacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de processos (depois das tabelas referenciadas)
/*CREATE TABLE processos (
    id SERIAL PRIMARY KEY,
    id_processo BIGINT NOT NULL,
    data_abertura DATE NOT NULL,
    aberto_por TEXT NOT NULL,
    id_tipo_de_Processo BIGINT NOT NULL, 
    tipo_processo TEXT NOT NULL,
    id_estabelecimento BIGINT,
    estabelecimento TEXT,
    situacao TEXT,
    reservado CHAR(1),
    reservado_por TEXT,
    documentos_obrigatorios CHAR(1),
    documentos_faltantes TEXT,
    sg TEXT,
    chassi TEXT,
    km INTEGER,
    data_abertura_os DATE,
    data_ultimo_apontamento DATE,
    valor_peca NUMERIC(12, 2),
    valor_mo NUMERIC(12, 2),
    cit TEXT,
    nome_arquivo TEXT NOT NULL,
    data_importacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
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


