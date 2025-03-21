// server.js
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Configuração para interpretar o corpo das requisições
app.use(bodyParser.json());

// Criando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Substitua com seu usuário do banco de dados
  password: 'senha',  // Substitua com sua senha do banco
  database: 'nome_do_banco'  // Substitua com o nome do seu banco
});

// Função para realizar a ação no banco de dados
function doDBAction(id) {
  // Prevenindo SQL Injection com Prepared Statements
  const query = "SELECT * FROM users WHERE userID = ?";
  connection.execute(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados: ", err);
      return;
    }
    console.log(results);
  });
}

// Exemplo de endpoint para testar a função
app.post('/do_SomeAction', (req, res) => {
  const { userID } = req.body; // Esperando um ID no corpo da requisição
  
  // Chama a função doDBAction passando o ID
  doDBAction(userID);

  // Retorna sucesso
  res.json({ message: "Ação realizada com sucesso!", user: userID });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
