const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const routeRoutes = require('./routes/routeRoutes'); // Nova rota para veículos

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/routes', routeRoutes); // Rota de pesquisa de veículos

// Sincroniza o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
