const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, './database/myfit.db');

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar no SQLite', err);
    } else {
        console.log('🚀 Conectado ao banco SQLite!');
    }
});

// Criar a tabela de usuários, se não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        cpf TEXT NOT NULL UNIQUE,
        telefone TEXT,
        data_nascimento TEXT,
        sexo INTEGER,
        senha TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        peso_atual INTEGER,
        altura_atual INTEGER,
        braco_atual INTEGER,
        quadril_atual INTEGER,
        cintura_atual INTEGER,
        coxa_atual INTEGER,
        umbigo_atual INTEGER
    );

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
    );

    CREATE TABLE IF NOT EXISTS historico_hidratacao (
        id_hidratacao INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        data_hora_medicao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
        
    CREATE TABLE IF NOT EXISTS historico_medidas (
        id_medicao INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        coxa INTEGER NOT NULL,
        braco INTEGER NOT NULL,
        cintura INTEGER NOT NULL,
        umbigo INTEGER NOT NULL,
        quadril INTEGER NOT NULL,
        altura INTEGER NOT NULL,
        data_hora_medicao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
        
    CREATE TABLE IF NOT EXISTS historico_pesagem (
        id_pesagem INTEGER PRIMARY KEY AUTOINCREMENT,
        peso INTEGER NOT NULL,
        data_hora_pesagem DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        id_usuario INTEGER NOT NULL,

        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
        
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

        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        FOREIGN KEY (id_alimento) REFERENCES alimentos(id_alimento)
    );
`);

module.exports = db;