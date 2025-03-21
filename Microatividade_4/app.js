const express = require('express');
const jwt = require('jsonwebtoken');  // Importa o jsonwebtoken
const app = express();
const port = 3000;

// Middleware para tratar JSON
app.use(express.json());

// Chave secreta para assinar o JWT
const JWT_SECRET = 'sua_chave_secreta_aqui';

// Endpoint de autenticação
app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // Validação simples para o exemplo
  if (username === 'admin' && password === 'adminpassword') {
    // Gerar o JWT
    const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });  // Expira em 1 hora
    res.json({ jwt_token: token });
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

// Middleware para verificar o JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];  // Captura o token do cabeçalho Authorization

  if (!token) {
    return res.status(403).send('Token não fornecido');
  }

  // Verifica o token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = decoded;  // Armazena o payload do token na requisição
    next();  // Passa para a próxima função
  });
}

// Exemplo de rota protegida
app.get('/protected', verifyToken, (req, res) => {
  res.send(`Acesso autorizado! Bem-vindo, ${req.user.username}`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
