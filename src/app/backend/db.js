const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myfit-database'
})

connection.connect((err)=>{
    if(err){
        console.err('Erro ao conectar no banco de dados', err);
    }else{
        console.log('Banco de dados conectado!');
    }
});

module.exports = connection;