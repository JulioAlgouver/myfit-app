const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('../backend/database');

const app = express();
app.use(cors());
app.use(express.json());

//CADASTRO DE USUARIO
app.post('/usuarios',async(request, response)=>{
    const {
        nome,
        email,
        senha,
        cpf,
        telefone,
        dataNascimento,
        sexo
    } = request.body;

    const senhaCriptografada = await bcrypt.hash(senha,10);

    const sql = `
        INSERT INTO USUARIOS
            (nome, email, senha, cpf, telefone, data_nascimento, sexo)
        VALUES
            (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
            [nome, email, senha, cpf, telefone, dataNascimento,sexo, senhaCriptografada],
            (err,result)=>{
                if (err){
                    return response.status(500).json(err);
                }
                response.status(201).json({
                    message:'Usuário cadastrado com sucesso!'
                });
            }
    );
});

//LOGIN DO USUARIO

app.post('/login',(request, response)=>{
    const {
        cpf,
        senha
    } = request.body;

    db.query(
        `SELECT * FROM USUARIOS WHERE cpf = ?`, [cpf],
        async (err, results)=>{
            if(err || results.length === 0){
                return response.status(401).json({
                    message:'Usuário não encontrado!'
                });
            }

            const usuario = results[0];
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if(!senhaValida){
                return results.status(401).json({
                    message: 'Senha invalida'
                });
            }

            response.json({
                message: 'Login realizado com sucesso!'
            });
        }
    );
});

app. listen(3000, ()=>{
    console.log('API rodando em http://localhost:3000')
});