const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../backend/db.js');

const app = express();
app.use(cors());
app.use(express.json());

// EXEMPLO DE ROTA PARA TESTAR
app.get('/', (req, res) => {
    res.send('API rodando com SQLite!');
});

// RODAR O SERVIDOR
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});


// CADASTRO DE USUARIO
app.post('/usuarios', async (req, res) => {
    const {
        nome,
        email,
        senha,
        cpf,
        telefone,
        dataNascimento,
        sexo
    } = req.body;

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
                return res.status(500).json({ error: 'Erro ao cadastrar o usuário', details: err });
            }
            res.status(201).json({
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

// BUSCAR USUARIOS POR ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    db.get(
        'SELECT * FROM usuarios WHERE id = ?',
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: 'Erro ao buscar usuário',
                    details: err
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            res.json(row);
        }
    );
});

//BUSCAR ALIMENTO POR ID
app.get('/alimentos/:id',(req, res) => {
    const { id } = req.params;

    db.get(
        'SELECT * FROM alimentos WHERE id_alimento = ?',
        [id],
        (err,row) => {
            if (err){
                return res.status(500).json({
                    error: 'Erro ao buscar alimento',
                    details: err
                });
            }

            if (!row){
                return res.status(404).json({
                    message: 'Alimento não encontrado'
                });
            }

            res.json(row);
        }
    );
})


// ROTA PARA LISTAR TODOS OS USUARIOS
app.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários', details: err });
        }
        res.json(rows);
    });
});

// ROTA PARA LISTAR TODOS OS ALIMENTOS
app.get('/alimentos',(req, res) => {
    db.all('SELECT * FROM alimentos',[], (err,rows) =>{
        if(err){
            return res.status(500).json({ error: 'Erro ao buscar alimentos', details: err });
        }
        res.json(rows);
    })
})


// REGISTRAR PESO DO USUARIO
app.post('/pesagem', (req, res) => {
  const { pesoAtual, idUsuario } = req.body;

  // Validação básica
  if (!pesoAtual || !idUsuario) {
    return res.status(400).json({ message: 'Peso ou usuário não informado' });
  }

  const sql = `
    INSERT INTO historico_pesagem (peso, id_usuario) VALUES (?, ?)
  `;

  db.run(sql, [pesoAtual, idUsuario], function (err) {
    if (err) {
      console.error('Erro ao registrar peso:', err);
      return res.status(500).json({
        message: 'Erro ao registrar peso',
        details: err.message, // envia só a mensagem do erro
      });
    }

    // Use this.lastID se quiser retornar o ID do registro inserido
    res.status(201).json({
      message: 'Pesagem registrada com sucesso!',
      id: this.lastID,
    });
  });
});


// ATUALIZAR PESO NO CADASTRO DO USUARIO
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { pesoAtual } = req.body;

    const sql = `
        UPDATE usuarios SET peso_atual = ? WHERE id = ?
    `;

    db.run(sql, [pesoAtual, id], function(err){
        if (err) {
            console.error('Erro ao atualizar o peso no cadastro do usuario');
            return res.status(500).json({
                message: 'Erro ao atualizar peso',
                details: err.message,
            });
        }

        res.status(201).json({
            message: 'Peso atualizado no cadastro do usuário',
        });
    });
});


// ATUALIZAR MEDIDAS NO CADASTRO DO USUARIO
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { alturaAtual } = req.body;
    const { bracoAtual } = req.body;
    const { quadrilAtual } = req.body;
    const { cinturaAtual } = req.body;
    const { coxaAtual } = req.body;
    const { umbigoAtual } = req.body;

    const sql = `
        UPDATE usuarios SET altura_atual = ? WHERE id_usuario = ?
        UPDATE usuarios SET braco_atual = ? WHERE id_usuario = ?
        UPDATE usuarios SET quadril_atual = ? WHERE id_usuario = ?
        UPDATE usuarios SET cintura_atual = ? WHERE id_usuario = ?
        UPDATE usuarios SET coxa_atual = ? WHERE id_usuario = ?
        UPDATE usuarios SET umbigo_atual = ? WHERE id_usuario = ?
    `;

    db.run(sql, [alturaAtual,bracoAtual,quadrilAtual,cinturaAtual,coxaAtual,umbigoAtual,id], function(err){
        if (err) {
            console.error('Erro ao atualizar as medidas no cadastro do usuario');
            return res.status(500).json({
                message: 'Erro ao atualizar peso',
                details: err.message,
            });
        }

        res.status(201).json({
            message: 'Medidas atualizadas no cadastro do usuário',
        });
    });
});


// LISTAR PESAGENS

app.get('/pesagem', (req, res) => {
    db.all('SELECT * FROM historico_pesagem', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Erro ao buscar pesagem', 
                details: err 
            });
        }
        res.json(rows);
    });
});

// LISTAR PESAGENS POR USUARIO

app.get('/pesagem/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;

    db.all(
        'SELECT * FROM historico_pesagem WHERE id_usuario = ?',
        [id_usuario],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: 'Erro ao buscar pesagem',
                    details: err
                });
            }

            if (!rows) {
                return res.status(404).json({
                    message: 'Pesagem não encontrada'
                });
            }

            res.json(rows);
        }
    );
});



// PEGAR DATA DA ULTIMA PESAGEM DO USUARIO
app.get('/pesagem/ultima/:id_usuario', (req, res) => {
    const {id_usuario} = req.params;

    db.get(`SELECT 
                data_hora_pesagem 
            FROM 
                historico_pesagem 
            WHERE 
                id_usuario = ?
            ORDER BY data_hora_pesagem DESC
            LIMIT 1`, 
            [id_usuario],(err, row) => {
        if(err){
            return res.status(500).json({
                error: 'Erro ao buscar registro de pesagem', 
                details: err
            });
        }
        if (!row) {
                return res.status(404).json({
                    message: 'Nenhuma pesagem encontrada'
                });
            }
        res.json(row);
    });
});



// REGISTRAR MEDIDAS
app.post('/medidas', (req, res) =>{
    const {
        quadril,
        umbigo,
        cintura,
        braco,
        coxa,
        altura,
        idUsuario
    } = req.body;

    const sql = `
        INSERT INTO historico_medidas
            (quadril, umbigo, cintura, braco, coxa, altura, id_usuario)
        VALUES
        (?,?,?,?,?,?,?)
    `

    db.run(
        sql,
        [quadril, umbigo, cintura, braco, coxa, altura, idUsuario],
        (err) =>{
            if(err){
                return res.status(500).json({
                    message: 'Não foi possivel registrar medição.'
                })
            }
            res.status(200).json({
                message: 'Medição cadastrada com sucesso.'
            });
        }
    );
});


// CONSULTAR MEDIDAS
app.get('/medidas',(req, res) => {
    db.all(` SELECT * FROM historico_medidas`,[],(err,rows) => {
        if(err){
            return res.status(500).json({
                message:'Erro ao buscar medidas',
                details: err
            })
        }
        res.json(rows);
    })
})


// CONSULTAR MEDIDAS POR USUARIO
app.get('/medidas/:id_usuario',(req, res) => {
    const id_usuario = req.params;

    db.all(` SELECT * FROM historico_medidas WHERE id_usuario = ?`,[id_usuario],(err,rows) => {
        if(err){
            return res.status(500).json({
                message:'Erro ao buscar medidas'
            })
        }
        if(!rows){
            return res.status(404).json({
                message: 'Nenhuma medida encontrada para este usuario'
            })
        }
        res.json(rows)
    })
})