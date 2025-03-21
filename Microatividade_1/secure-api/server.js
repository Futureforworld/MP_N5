require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // Middleware para ler JSON no corpo da requisição

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "minha_chave_secreta"; // Chave JWT

// Simula um banco de dados de usuários
const users = [
    { id: 1, username: 'admin', password: '123456' }
];

// Endpoint para login - gera o token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe e a senha está correta
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Gera um token JWT válido por 1 hora
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    // Obtém o token no cabeçalho "Authorization"
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token ausente.' });
    }

    try {
        // Verifica a validade do token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

// Rota protegida - requer autenticação
app.get('/confidential-data', authenticateToken, (req, res) => {
    const jsonData = { message: "Aqui estão os dados confidenciais!" };
    res.json(jsonData);
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
