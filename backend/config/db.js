const { Sequelize } = require('sequelize');

// Conecta ao banco de dados SQLite (ou você pode usar outro, como MySQL ou Postgres)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Caminho do banco de dados
});

module.exports = { sequelize };
