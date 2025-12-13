const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../backend/db.js');

const app = express();
app.use(cors());
app.use(express.json());

// Exemplo de rota para testar
app.get('/', (req, res) => {
    res.send('API rodando com SQLite!');
});

// CADASTRO DE USUARIO
app.post('/usuarios', async (request, response) => {
    const {
        nome,
        email,
        senha,
        cpf,
        telefone,
        dataNascimento,
        sexo
    } = request.body;

    // Criptografando a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = `
        INSERT INTO USUARIOS
            (nome, email, senha, cpf, telefone, data_nascimento, sexo)
        VALUES
            (?,?,?,?,?,?,?)
    `;

    db.run(  // Usando db.run em vez de db.query, porque é para inserir dados
        sql,
        [nome, email, senhaCriptografada, cpf, telefone, dataNascimento, sexo],
        (err) => {
            if (err) {
                return response.status(500).json({ error: 'Erro ao cadastrar o usuário', details: err });
            }
            response.status(201).json({
                message: 'Usuário cadastrado com sucesso!'
            });
        }
    );
});

// LOGIN DO USUARIO
app.post('/login', (request, response) => {
    const { cpf, senha } = request.body;

    db.get( // Usando db.get porque só esperamos um único usuário
        `SELECT * FROM USUARIOS WHERE cpf = ?`, [cpf],
        async (err, usuario) => {
            if (err || !usuario) {
                return response.status(401).json({
                    message: 'Usuário não encontrado!'
                });
            }

            // Comparando a senha informada com a criptografada no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return response.status(401).json({
                    message: 'Senha inválida'
                });
            }

            response.json({
                message: 'Login realizado com sucesso!',
                user: usuario  // Retornando dados do usuário logado (opcional)
            });
        }
    );
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
    db.all('SELECT id, nome, email, cpf, telefone, data_nascimento, sexo, created_at FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários', details: err });
        }
        res.json(rows);
    });
});


// Rodar o servidor
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});
