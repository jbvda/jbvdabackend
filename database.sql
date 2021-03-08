DROP DATABASE `jogo_bicho`;

CREATE DATABASE `jogo_bicho` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `jogo_bicho`;

-- jogo_bicho.sorteios_loteria definition

CREATE TABLE `sorteios_loteria` (
  `id` int(11) NOT NULL,
  `data_apuracao` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- jogo_bicho.tipos_jogo definition

CREATE TABLE `tipos_jogo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(64) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- jogo_bicho.usuarios definition

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(16) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `nivel_acesso` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- jogo_bicho.bilhetes definition

CREATE TABLE `bilhetes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `bilhetes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- jogo_bicho.dezenas_sorteadas definition

CREATE TABLE `dezenas_sorteadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sorteio` int(11) NOT NULL,
  `dezena` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sorteio` (`id_sorteio`),
  CONSTRAINT `dezenas_sorteadas_ibfk_1` FOREIGN KEY (`id_sorteio`) REFERENCES `sorteios_loteria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- jogo_bicho.multiplicadores_aposta definition

CREATE TABLE `multiplicadores_aposta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_jogo` int(11) NOT NULL,
  `valor` float NOT NULL DEFAULT 1,
  `numero_acertos` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_jogo` (`id_jogo`),
  CONSTRAINT `multiplicadores_aposta_ibfk_1` FOREIGN KEY (`id_jogo`) REFERENCES `tipos_jogo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- jogo_bicho.animais definition

CREATE TABLE `animais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- jogo_bicho.dezenas_animais definition

CREATE TABLE `dezenas_animais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_animal` int(11) NOT NULL,
  `dezena` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dezena` (`dezena`),
  KEY `id_animal` (`id_animal`),
  CONSTRAINT `dezenas_animais_ibfk_1` FOREIGN KEY (`id_animal`) REFERENCES `animais` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- jogo_bicho.apostas definition

CREATE TABLE `apostas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_bilhete` int(11) NOT NULL,
  `id_multiplicador` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `palpite` int(11) NOT NULL,
  `valor` float NOT NULL,
  `ganhou` tinyint(1) DEFAULT NULL,
  `retirou` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bilhete` (`id_bilhete`),
  KEY `id_multiplicador` (`id_multiplicador`),
  CONSTRAINT `apostas_ibfk_1` FOREIGN KEY (`id_bilhete`) REFERENCES `bilhetes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `apostas_ibfk_3` FOREIGN KEY (`id_multiplicador`) REFERENCES `multiplicadores_aposta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `apostas_ibfk_4` FOREIGN KEY (`id_animal`) REFERENCES `animais` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- jogo_bicho.parametros definition

CREATE TABLE `parametros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(64) NOT NULL,
  `valor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `registros_financeiros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `tipo` enum('e','s') NOT NULL,
  `valor` float NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `registros_financeiros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO jogo_bicho.tipos_jogo (nome,createdAt,updatedAt) VALUES
	 ('Animal','2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 ('Dezena','2021-02-28 23:14:16.0','2021-02-28 23:14:16.0'),
	 ('Centena','2021-02-28 23:14:22.0','2021-02-28 23:14:22.0');

INSERT INTO jogo_bicho.multiplicadores_aposta (id_jogo,valor,numero_acertos,createdAt,updatedAt) VALUES
	 (1,18.0,1,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 (1,3.6,5,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 (2,60.0,1,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 (2,12.0,5,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 (3,600.0,1,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0'),
	 (3,120.0,5,'2021-02-28 23:14:11.0','2021-02-28 23:14:11.0');

INSERT INTO jogo_bicho.animais (nome) VALUES
	 ('Avestruz'),
	 ('Águia'),
	 ('Burro'),
	 ('Borboleta'),
	 ('Cachorro'),
	 ('Cabra'),
	 ('Carneiro'),
	 ('Camelo'),
	 ('Cobra'),
	 ('Coelho');
INSERT INTO jogo_bicho.animais (nome) VALUES
	 ('Cavalo'),
	 ('Elefante'),
	 ('Galo'),
	 ('Gato'),
	 ('Jacaré'),
	 ('Leão'),
	 ('Macaco'),
	 ('Porco'),
	 ('Pavão'),
	 ('Peru');
INSERT INTO jogo_bicho.animais (nome) VALUES
	 ('Touro'),
	 ('Tigre'),
	 ('Urso'),
	 ('Veado'),
	 ('Vaca');
INSERT INTO jogo_bicho.animais (id, nome) VALUES (99, 'Nenhum');

INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (1,'01'),
	 (1,'02'),
	 (1,'03'),
	 (1,'04'),
	 (2,'05'),
	 (2,'06'),
	 (2,'07'),
	 (2,'08'),
	 (3,'09'),
	 (3,'10');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (3,'11'),
	 (3,'12'),
	 (4,'13'),
	 (4,'14'),
	 (4,'15'),
	 (4,'16'),
	 (5,'17'),
	 (5,'18'),
	 (5,'19'),
	 (5,'20');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (6,'21'),
	 (6,'22'),
	 (6,'23'),
	 (6,'24'),
	 (7,'25'),
	 (7,'26'),
	 (7,'27'),
	 (7,'28'),
	 (8,'29'),
	 (8,'30');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (8,'31'),
	 (8,'32'),
	 (9,'33'),
	 (9,'34'),
	 (9,'35'),
	 (9,'36'),
	 (10,'37'),
	 (10,'38'),
	 (10,'39'),
	 (10,'40');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (11,'41'),
	 (11,'42'),
	 (11,'43'),
	 (11,'44'),
	 (12,'45'),
	 (12,'46'),
	 (12,'47'),
	 (12,'48'),
	 (13,'49'),
	 (13,'50');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (13,'51'),
	 (13,'52'),
	 (14,'53'),
	 (14,'54'),
	 (14,'55'),
	 (14,'56'),
	 (15,'57'),
	 (15,'58'),
	 (15,'59'),
	 (15,'60');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (16,'61'),
	 (16,'62'),
	 (16,'63'),
	 (16,'64'),
	 (17,'65'),
	 (17,'66'),
	 (17,'67'),
	 (17,'68'),
	 (18,'69'),
	 (18,'70');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (18,'71'),
	 (18,'72'),
	 (19,'73'),
	 (19,'74'),
	 (19,'75'),
	 (19,'76'),
	 (20,'77'),
	 (20,'78'),
	 (20,'79'),
	 (20,'80');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (21,'81'),
	 (21,'82'),
	 (21,'83'),
	 (21,'84'),
	 (22,'85'),
	 (22,'86'),
	 (22,'87'),
	 (22,'88'),
	 (23,'89'),
	 (23,'90');
INSERT INTO jogo_bicho.dezenas_animais (id_animal,dezena) VALUES
	 (23,'91'),
	 (23,'92'),
	 (24,'93'),
	 (24,'94'),
	 (24,'95'),
	 (24,'96'),
	 (25,'97'),
	 (25,'98'),
	 (25,'99'),
	 (25,'00');

INSERT INTO jogo_bicho.usuarios (login,senha,nome,nivel_acesso,createdAt,updatedAt) 
VALUES ('jbvda','$2b$10$7DcOfqJoNOh9ERDQOUNOEONQFGlzNb7DAeZcTVsqkpfeNMrBDhN2q','ADMIN',2,'2021-03-07 02:17:07.0','2021-03-07 02:17:07.0');