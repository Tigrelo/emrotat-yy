const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Tenta obter o token do cabeçalho Authorization
  const token = req.header('Authorization')?.split(' ')[1];

  // Se não houver token, retorna 401
  if (!token) return res.status(401).json({ message: 'Acesso negado, token não fornecido' });

  try {
    // Verifica o token usando o segredo
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Armazena o usuário verificado na requisição
    next(); // Prossegue para a próxima middleware ou rota
  } catch (error) {
    // Se o token for inválido, retorna 400
    return res.status(400).json({ message: 'Token inválido' });
  }
};
