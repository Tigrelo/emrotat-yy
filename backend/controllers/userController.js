const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para registrar um usuário
const registerUser = [
    // Validações
    body('username').isString().notEmpty().withMessage('O nome de usuário é obrigatório').isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),
    body('password').isString().notEmpty().withMessage('A senha é obrigatória').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),

    // Handler da requisição
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json(user);
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
    }
];

// Função para fazer login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: 'Senha inválida' });

        const token = jwt.sign({ id: user.id }, 'seu_segredo_aqui', { expiresIn: '15m' });

        return res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

// Exportar as funções
module.exports = {
    registerUser,
    loginUser,
};
