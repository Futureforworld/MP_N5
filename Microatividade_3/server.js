require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = { "user1": "password123", "admin": "adminpassword" };

const JWT_SECRET = process.env.JWT_SECRET || "chavePadraoSegura";
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN) || 3600;

// Função para gerar um token JWT
function generateToken(username) {
    const payload = { username };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Endpoint de login para autenticar usuário e gerar JWT
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username] && users[username] === password) {
        const token = generateToken(username);
        return res.json({ jwt_token: token });
    }
    
    res.status(401).json({ message: "Usuário ou senha incorretos" });
});

// Middleware para validar JWT antes de acessar alguma funcionalidade
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Acesso não autorizado" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Acesso não autorizado" });
        
        req.user = decoded;
        next();
    });
}

// Rota protegida que exige token JWT válido
app.post('/do_SomeAction', authenticateToken, (req, res) => {
    res.json({ message: "Ação realizada com sucesso!", user: req.user.username });
});

// Inicia o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
