const express = require('express');
const { getRoutes } = require('../controllers/routeController'); // Lógica no controller
const router = express.Router();

// Definir a rota de busca de rotas de veículos
router.get('/', getRoutes);

module.exports = router;
