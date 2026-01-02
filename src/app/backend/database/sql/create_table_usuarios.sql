    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        cpf TEXT NOT NULL UNIQUE,
        telefone TEXT,
        data_nascimento TEXT,
        sexo INTEGER,
        senha TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
        peso_atual INTEGER;
        altura_atual INTEGER;
        braco_atual INTEGER;
        quadril_atual INTEGER;
        cintura_atual INTEGER;
        coxa_atual INTEGER;
        umbigo_atual INTEGER;
    )