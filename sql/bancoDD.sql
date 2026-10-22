CREATE DATABASE IF NOT EXISTS db_explorarmais;
USE db_explorarmais;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS tb_user (
    id_user INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nm_user VARCHAR(110) NOT NULL,
    nm_email VARCHAR(110) NOT NULL UNIQUE,
    nr_senha VARCHAR(255) NOT NULL,
    nr_telefone VARCHAR(20) DEFAULT NULL,
    dt_nascimento DATE DEFAULT NULL,
    nr_pontos INT DEFAULT 500, -- 500 pontos de boas-vindas
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de destinos (Exclusivamente Brotas, São Roque e Campos do Jordão)
CREATE TABLE IF NOT EXISTS tb_destino (
    id_destino INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nm_destino VARCHAR(150) NOT NULL,
    ds_slogan VARCHAR(200),
    ds_descricao TEXT,
    nm_estado VARCHAR(50) DEFAULT 'São Paulo',
    nm_cidade VARCHAR(100),
    vl_preco_base DECIMAL(10,2),
    nm_imagem VARCHAR(255),
    nm_categoria VARCHAR(50),
    nr_avaliacao DECIMAL(2,1) DEFAULT 4.9,
    bl_ativo TINYINT(1) DEFAULT 1,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pacotes
CREATE TABLE IF NOT EXISTS tb_pacote (
    id_pacote INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nm_pacote VARCHAR(200) NOT NULL,
    ds_descricao TEXT,
    id_destino INT NOT NULL,
    vl_preco DECIMAL(10,2) NOT NULL,
    nr_dias INT NOT NULL,
    nr_noites INT NOT NULL,
    nm_tipo_hospedagem VARCHAR(100),
    bl_alimentacao TINYINT(1) DEFAULT 1,
    bl_transporte TINYINT(1) DEFAULT 1,
    bl_guia TINYINT(1) DEFAULT 1,
    nm_imagem VARCHAR(255),
    bl_destaque TINYINT(1) DEFAULT 0,
    bl_ativo TINYINT(1) DEFAULT 1,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_destino) REFERENCES tb_destino(id_destino) ON DELETE CASCADE
);

-- Tabela de agendamentos/viagens
CREATE TABLE IF NOT EXISTS tb_agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_user INT NOT NULL,
    id_pacote INT NOT NULL,
    dt_partida DATE NOT NULL,
    dt_retorno DATE NOT NULL,
    nr_pessoas INT DEFAULT 1,
    vl_total DECIMAL(10,2) NOT NULL,
    nm_status VARCHAR(30) DEFAULT 'Confirmado', -- 'Confirmado', 'Pendente', 'Concluído', 'Cancelado'
    ds_observacao TEXT,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES tb_user(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_pacote) REFERENCES tb_pacote(id_pacote) ON DELETE CASCADE
);

-- Tabela de questionário de destinos
CREATE TABLE IF NOT EXISTS tb_questionario (
    id_questionario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_user INT NULL,
    nm_clima VARCHAR(50),
    nm_tipo_viagem VARCHAR(50),
    nm_orcamento VARCHAR(50),
    nm_duracao VARCHAR(50),
    nm_atividades VARCHAR(200),
    nm_companhia VARCHAR(50),
    ds_resultado VARCHAR(100),
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES tb_user(id_user) ON DELETE SET NULL
);

-- Tabela de pontuação/fidelidade
CREATE TABLE IF NOT EXISTS tb_pontuacao (
    id_pontuacao INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_user INT NOT NULL,
    nr_pontos INT NOT NULL,
    nm_tipo VARCHAR(50) NOT NULL, -- 'credito' ou 'debito'
    ds_descricao VARCHAR(200),
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES tb_user(id_user) ON DELETE CASCADE
);

-- Limpa dados anteriores caso existam
DELETE FROM tb_agendamento;
DELETE FROM tb_pacote;
DELETE FROM tb_destino;

-- 1. Inserção dos 3 Destinos Oficiais
INSERT INTO tb_destino (id_destino, nm_destino, ds_slogan, ds_descricao, nm_estado, nm_cidade, vl_preco_base, nm_categoria, nr_avaliacao, nm_imagem) VALUES
(1, 'Brotas', 'Capital Nacional da Aventura e do Ecoturismo', 'Famosa por suas quedas d''água cristalinas, rafting no Rio Jacaré-Pepira, tirolesas panorâmicas e natureza intocada. O refúgio perfeito para quem ama aventura, ar puro e energia renovada.', 'São Paulo', 'Brotas', 890.00, 'aventura', 4.9, 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800'),

(2, 'São Roque', 'A Rota do Vinho, Charme e Gastronomia Serrana', 'A poucos quilômetros da capital, São Roque encanta com sua famosa Estrada do Vinho, vinícolas boutique premiadas, degustações harmonizadas e restaurantes com o melhor da gastronomia ítalo-portuguesa.', 'São Paulo', 'São Roque', 650.00, 'enoturismo', 4.8, 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800'),

(3, 'Campos do Jordão', 'A Suíça Brasileira no Alto da Mantiqueira', 'Destino dos sonhos na Serra da Mantiqueira com arquitetura de estilo alpino europeu, clima frio charmoso, restaurantes de fondue, chocolates artesanais finos e passeios inesquecíveis pelo teleférico e Capivari.', 'São Paulo', 'Campos do Jordão', 1150.00, 'serra', 4.9, 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800');

-- 2. Inserção dos Pacotes Oficiais (Exclusivos para Brotas, São Roque e Campos do Jordão)
INSERT INTO tb_pacote (id_pacote, nm_pacote, ds_descricao, id_destino, vl_preco, nr_dias, nr_noites, nm_tipo_hospedagem, bl_alimentacao, bl_transporte, bl_guia, bl_destaque, nm_imagem) VALUES
-- Brotas
(1, 'Brotas Aventura Radical', 'Rafting completo no Rio Jacaré-Pepira, circuito de tirolesas nos cânions, visita à Cachoeira Cassorova e almoço caipira típico com hospedagem em eco-resort.', 1, 1290.00, 3, 2, 'Eco Resort', 1, 1, 1, 1, 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800'),

(2, 'Brotas Ecoturismo & Relax', 'Roteiro tranquilo com visita à nascente Areia que Canta, banho nas cachoeiras mais acessíveis, spa relaxante e degustação de doces e cachaças da fazenda.', 1, 980.00, 2, 1, 'Pousada de Charme', 1, 1, 1, 0, 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800'),

-- São Roque
(3, 'São Roque Rota do Vinho & Degustação', 'Tour completo pelas principais vinícolas de São Roque com sommelier, degustação de 8 rótulos selecionados, almoço harmonizado e hospedagem em pousada campestre.', 2, 890.00, 2, 1, 'Pousada dos Vinhedos', 1, 1, 1, 1, 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800'),

(4, 'São Roque Gastronômico & Romântico', 'Final de semana a dois com visita exclusiva às adegas, piquenique nos vinhedos ao entardecer, jantar com sequência de massas artesanais e vinhos finos.', 2, 1150.00, 3, 2, 'Hotel Boutique Campestre', 1, 0, 1, 0, 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800'),

-- Campos do Jordão
(5, 'Campos do Jordão Inverno & Charme', 'O pacote clássico da Mantiqueira: hospedagem em hotel no estilo alpino em Capivari, jantar de boas-vindas com fondue suíço tradicional, passeio de teleférico e visita ao Parque Amantikir.', 3, 1850.00, 3, 2, 'Hotel Boutique Europeu', 1, 1, 1, 1, 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800'),

(6, 'Campos do Jordão Mantiqueira Vip', 'Experiência de alto luxo: chalé com hidromassagem e lareira, tour gastronômico pelas cervejarias artesanais e fábricas de chocolate, mirante Pico do Itapeva com transfer executivo.', 3, 2450.00, 4, 3, 'Chalé de Luxo', 1, 1, 1, 1, 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800');

-- 3. Inserção de Usuário de Demonstração
INSERT INTO tb_user (id_user, nm_user, nm_email, nr_senha, nr_telefone, dt_nascimento, nr_pontos) VALUES
(1, 'Viajante Explorador', 'admin@explorarmais.com.br', '123456', '(11) 98765-4321', '1995-05-15', 3850);

-- 4. Inserção de Agendamentos de Demonstração
INSERT INTO tb_agendamento (id_agendamento, id_user, id_pacote, dt_partida, dt_retorno, nr_pessoas, vl_total, nm_status, ds_observacao) VALUES
(1, 1, 1, '2026-11-14', '2026-11-16', 2, 2580.00, 'Confirmado', 'Quarto com vista para a natureza. Preferência por rafting matutino.'),
(2, 1, 3, '2026-09-12', '2026-09-13', 2, 1780.00, 'Concluído', 'Viagem realizada com sucesso. Excelente degustação.');

-- 5. Inserção de Histórico de Pontuação
INSERT INTO tb_pontuacao (id_user, nr_pontos, nm_tipo, ds_descricao) VALUES
(1, 500, 'credito', 'Bônus de boas-vindas ao se cadastrar'),
(1, 1780, 'credito', 'Pontos ganhos na viagem: São Roque Rota do Vinho'),
(1, 1570, 'credito', 'Pontos acumulados na reserva: Brotas Aventura Radical');
