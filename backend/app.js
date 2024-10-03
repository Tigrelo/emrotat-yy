const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db'); // Importa a configuração do banco de dados

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para processar dados JSON

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Sincroniza o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
