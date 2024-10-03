const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do cabeçalho

  if (!token) return res.status(401).json({ message: 'Acesso negado, token não fornecido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Prossegue para a próxima middleware ou rota
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};
