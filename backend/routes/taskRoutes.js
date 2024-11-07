const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Rota para obter todas as tarefas
router.get('/', getTasks);

// Rota para criar uma nova tarefa
router.post('/', createTask);

module.exports = router;
