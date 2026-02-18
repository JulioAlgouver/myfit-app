const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../backend/db.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = '217026b45aafede7';
const TOKEN_EXPIRATION = 30000 // 8 HORAS E 20 MINUTOS

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Middleware CORS
app.use(cors());


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

            const token = jwt.sign({ usuario }, SECRET_KEY, {expiresIn: TOKEN_EXPIRATION });

            response.json({
                token,
                usuario,
                message: 'Login realizado com sucesso!',
            })
        }
    );
});


// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        //Erro de "não autorizado"
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err){
            //Erro "Forbidden", o servidor entendeu a requisição mas não possui permissão
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

//Endpoint para validar token
app.get('/verify-token', authenticateToken, (req,res) => {
    res.json({
        valid:true,
        user: req.user
    });
});



/* ------------------------------ USUARIOS ------------------------------*/

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


app.get('/usuario-logado', authenticateToken, (req, res) => {
    res.json(req.user.usuario); // req.user vem do JWT
});


/*

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

*/

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

// ROTA PARA LISTAR TODOS OS USUARIOS
app.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuários', details: err });
        }
        res.json(rows);
    });
});

// ALTERAR SENHA
app.put('/update-password', authenticateToken , async (req,res) => {
    const {
        senhaAtual,
        novaSenha
    } = req.body

    const idUsuario = req.user.usuario.id;

    if(!senhaAtual || !novaSenha){
        return res.status(400).json({
            message: 'Senha atual e senha nova são obrigatórias'
        });
    }

    db.get(
        'SELECT senha FROM usuarios WHERE id = ?',
        [idUsuario],
        async (err,usuario) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao buscar usuário',
                    details: err
                });
            }

            if(!usuario){
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            //VALIDA SENHA ATUAL
            const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
            if(!senhaValida){
                return res.status(401).json({
                    message: 'Senha atual incorreta'
                });
            }

            //CRIPTOGRAFAR NOVA SENHA
            const novaSenhaHash = await bcrypt.hash(novaSenha,10);

            //ATUALIZAR SENHA NO BANCO

            db.run(
                'UPDATE usuarios SET senha = ? WHERE id = ?',
                [novaSenhaHash, idUsuario],
                (err) => {
                    if(err) {
                        return res.status(500).json({
                            message: 'Erro ao atualizar senha',
                            details: err
                        });
                    }

                    res.json({
                        message: 'Senha atualizada com sucesso!'
                    });
                }
            );
        }
    );
});

//ALTERAR META PESO
app.put('/atualiza-meta/:id', (req, res) => {
    const { peso_meta  } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE usuarios SET peso_meta = ? WHERE id = ?
    `;

    db.run(sql, [peso_meta , id], function(err) {
        if (err) {
            return res.status(500).json({
                message: 'Erro ao atualizar meta',
                details: err
            });
        }

        res.json({
            message: 'Meta atualizada com sucesso!',
            changes: this.changes
        });
    });
});

//CONSULTAR META PESO POR USUARIO
app.get('/usuarios/:id/pesoMeta', (req,res)=>{
    const {id} = req.params;

    const sql = `
        SELECT peso_meta FROM usuarios WHERE id = ?
    `;

    db.get(sql,[id],(err,row)=>{
        if(err){
            return res.status(500).json({
                message:'Erro ao consultar registro',
                details: err
            })
        }

        res.json(row);
    });
});


/* ----------------------------- ALIMENTOS -----------------------------*/


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

// ROTA PARA LISTAR TODOS OS ALIMENTOS
app.get('/alimentos',(req, res) => {
    db.all('SELECT * FROM alimentos',[], (err,rows) =>{
        if(err){
            return res.status(500).json({ error: 'Erro ao buscar alimentos', details: err });
        }
        res.json(rows);
    })
})



/* -------------------------------- PESO --------------------------------*/



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
app.put('/usuarios/:id/peso', (req, res) => {
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
        `SELECT *
         FROM (
            SELECT *
            FROM historico_pesagem
            WHERE id_usuario = ?
            ORDER BY data_hora_pesagem DESC
            LIMIT 10
         ) AS ultimos
         ORDER BY data_hora_pesagem ASC`,
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


/* ------------------------------ MEDIDAS ------------------------------*/




// ATUALIZAR MEDIDAS NO CADASTRO DO USUARIO
app.put('/usuarios/:id/medidas', (req, res) => {
    const { id } = req.params;
    const { quadrilAtual } = req.body;
    const { umbigoAtual } = req.body;
    const { cinturaAtual } = req.body;
    const { bracoAtual } = req.body;
    const { coxaAtual } = req.body;
    const { alturaAtual } = req.body;

    const sql = `
        UPDATE 
            usuarios 
        SET 
            quadril_atual = ?,
            umbigo_atual  = ?,
            cintura_atual = ?,
            braco_atual = ?,
            coxa_atual = ?,
            altura_atual = ?
        WHERE 
            id = ?
    `;

    db.run(sql, [
        quadrilAtual,
        umbigoAtual,
        cinturaAtual,
        bracoAtual,
        coxaAtual,
        alturaAtual,
        id], function(err){
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
    const {id_usuario} = req.params;

    db.all(`SELECT *
            FROM(
                SELECT *
                FROM historico_medidas
                WHERE id_usuario = ?
                ORDER BY data_hora_medicao DESC
                LIMIT 10
            ) AS ultimos
            ORDER BY data_hora_medicao ASC`,[id_usuario],(err,rows) => {
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




/* -------------------------------- AGUA --------------------------------*/




// REGISTRAR HIDRATAÇÃO
app.post('/hidratacao', authenticateToken, (req, res) =>{
    const { quantidade } = req.body;
    const id_usuario = req.user.usuario.id;

    const sql = `
        INSERT INTO historico_hidratacao
            (quantidade, id_usuario)
        VALUES
        (?,?)
    `

    db.run(
        sql,
        [quantidade, id_usuario],
        (err) =>{
            if(err){
                return res.status(500).json({
                    message: 'Não foi possivel registrar.'
                })
            }
            res.status(200).json({
                message: 'Hidratação registrada com sucesso.'
            });
        }
    );
});

// CONSULTAR HISTORICO HIDRATACAO
app.get('/hidratacao',(req, res) => {
    db.all(`SELECT * FROM historico_hidratacao`,[],(err,rows) => {
        if(err){
            return res.status(500).json({
                message:'Erro ao buscar registros',
                details: err
            })
        }
        res.json(rows);
    })
})

// CONSULTAR HISTORICO HIDRATACAO POR USUARIO E DIA
app.get('/hidratacao/valorDiario', authenticateToken, (req, res) => {
    const id_usuario = req.user.usuario.id;

    db.get(`
        SELECT COALESCE(SUM(quantidade), 0) AS valor_diario
        FROM historico_hidratacao
        WHERE id_usuario = ? AND
              date(data_hora_medicao) = date('now','localtime')
    `, [id_usuario], (err, row) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar hidratação', details: err });
        res.json({ valor_diario: row.valor_diario || 0 });
    });
});

// CONSULTAR HISTORICO HIDRATACAO POR USUARIO
app.get('/hidratacao/:id_usuario',(req, res) => {
    const {id_usuario} = req.params;

    db.all(` SELECT * FROM historico_hidratacao WHERE id_usuario = ?`,
        [id_usuario],(err,rows) => {
        if(err){
            return res.status(500).json({
                message:'Erro ao buscar registros'
            })
        }
        if(!rows){
            return res.status(404).json({
                message: 'Nenhum registro encontrado para este usuario'
            })
        }
        res.json(rows)
    })
})

// ATUALIZAR AGUA NO CADASTRO DO USUARIO
app.put('/usuarios/:id/agua', (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    const sql = `
        UPDATE usuarios SET agua = ? WHERE id = ?
    `;

    db.run(sql, [quantidade, id], function(err){
        if (err) {
            console.error('Erro ao atualizar a agua no cadastro do usuario');
            return res.status(500).json({
                message: 'Erro ao atualizar agua',
                details: err.message,
            });
        }

        res.status(201).json({
            message: 'Agua atualizada no cadastro do usuário',
        });
    });
});


// PEGAR DADOS PARA CALCULO DO IMC (ALTURA E PESO)
app.get('/usuarios/:id/imcData',(req, res) => {
    const {id} = req.params;

    db.get(`SELECT peso_atual, altura_atual FROM usuarios WHERE id = ?`,
        [id],(err,rows) => {
        if(err){
            res.status(500).json({
                message: 'Erro ao buscar Registro'
            })
        }

        res.json(rows)
    })
})



/* ----------------------------- REFEIÇÃO -----------------------------*/




// REGISTRAR REFEIÇÃO
app.post('/refeicoes', authenticateToken,(req,res) => {  
    const {
        id_alimento,
        descricao,
        tipo_refeicao,
        categoria,
        quantidade,
        total_calorias,
        total_proteinas,
        total_sodio,
        total_fibras,
        total_gorduras,
        total_carboidratos
    } = req.body;
    const id_usuario = req.user.usuario.id;


    const sql = `
        INSERT INTO refeicoes (
            id_usuario,
            id_alimento,
            descricao,
            tipo_refeicao,
            categoria,
            quantidade,
            total_calorias,
            total_proteinas,
            total_sodio,
            total_fibras,
            total_gorduras,
            total_carboidratos) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)    
        `
    db.run(sql,[
            id_usuario,
            id_alimento,
            descricao,
            tipo_refeicao,
            categoria,
            quantidade,
            total_calorias,
            total_proteinas,
            total_sodio,
            total_fibras,
            total_gorduras,
            total_carboidratos
    ],(err)=>{
        if (err){
            return res.status(500).json({
                message:'Não foi possível registrar refeição'
            })
        }
        res.status(200).json({
            message: 'Refeição registrada com sucesso'
        })
    })
});

// CONSULTAR REFEIÇÕES
app.get('/refeicoes', (req,res) => {
    db.all(`
            SELECT * FROM refeicoes
        `,[], (err,rows) => {
            if(err){
                return res.status(500).json({
                    message:'Erro ao buscar registros'
                })
            }
            if(!rows){
                return res.status(404).json({
                    message:'Nenhum registro encontrado'
                })
            }

            res.status(200).json(rows);
        })
})

// CONSULTAR REFEIÇÕES POR USUARIO
app.get('/refeicoes/:id_usuario', (req,res) => {

    const {id_usuario} = req.params;

    db.all(`
            SELECT * FROM refeicoes WHERE id_usuario = ?
        `,[id_usuario],(err,rows) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao buscar registro'
                })
            }
            if(!rows){
                return res.status(404).json({
                    message: 'Nenhum registro encontrado'
                })
            }

            res.status(200).json(rows);
        })
})

// CONSULTAR HISTORICO REFEICAO POR USUARIO E DIA
app.get('/refeicoes/:id_usuario/valorDiario', (req, res) => {
    const { id_usuario } = req.params;

    db.get(`
        SELECT 
            COALESCE(SUM(total_calorias), 0) AS total_calorias_diario,
            COALESCE(SUM(total_proteinas), 0) AS total_proteinas_diario,
            COALESCE(SUM(total_sodio), 0) AS total_sodio_diario,
            COALESCE(SUM(total_fibras), 0) AS total_fibras_diario,
            COALESCE(SUM(total_gorduras), 0) AS total_gorduras_diario,
            COALESCE(SUM(total_carboidratos), 0) AS total_carboidratos_diario
        FROM 
            refeicoes
        WHERE 
            id_usuario = ? AND
            date(data_hora_refeicao) = date('now','localtime')
    `, [id_usuario], (err, row) => {
        if (err) {
            return res.status(500).json({
                message: 'Erro ao buscar histórico de refeição',
                details: err.message
            });
        }
        res.json(row);
    });
});


/* ----------------------------- SERVIDOR -----------------------------*/




// RODAR O SERVIDOR
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});


// EXEMPLO DE ROTA PARA TESTAR
app.get('/', (req, res) => {
    res.send('API rodando com SQLite!');
});