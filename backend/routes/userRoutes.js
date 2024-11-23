// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth'); // Importa seu middleware

// Rota de registro
router.post('/register', userController.registerUser);

// Rota de login
router.post('/login', userController.loginUser);

// Rota protegida
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Acesso permitido! Você está autenticado.' });
});

module.exports = router;
