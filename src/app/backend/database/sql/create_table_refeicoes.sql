CREATE TABLE IF NOT EXISTS refeicoes (
    id_refeicao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_alimento INTEGER NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    tipo_refeicao VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    quantidade INTEGER NOT NULL,
    total_calorias DOUBLE NOT NULL,
    total_proteinas DOUBLE NOT NULL,
    total_sodio DOUBLE NOT NULL,
    total_fibras DOUBLE NOT NULL,
    total_gorduras DOUBLE NOT NULL,
    total_carboidratos DOUBLE NOT NULL,
    data_hora_refeicao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id)
    FOREIGN KEY (id_alimento) REFERENCES ALIMENTOS(id_alimento)
)