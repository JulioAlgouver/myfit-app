CREATE TABLE IF NOT EXISTS alimentos (
    id_alimento INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao VARCHAR(150) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    colesterol DOUBLE NOT NULL,
    caloria DOUBLE NOT NULL,
    proteina DOUBLE NOT NULL,
    carboidrato DOUBLE NOT NULL,
    fibra DOUBLE NOT NULL,
    sodio DOUBLE NOT NULL,
    lipideo DOUBLE NOT NULL
)