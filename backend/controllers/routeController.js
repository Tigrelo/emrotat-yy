const getRoutes = async (req, res) => {
    const query = req.query.query; // Parâmetro de busca
  
    // Simulação de dados de rotas de veículos (você pode conectar ao seu banco de dados aqui)
    const routes = [
      { id: 1, routeName: 'Linha 123', schedule: '08:00 - 18:00', stops: 'Parada A, Parada B' },
      { id: 2, routeName: 'Linha 456', schedule: '09:00 - 17:00', stops: 'Parada X, Parada Y' },
      // Adicione mais rotas conforme necessário
    ];
  
    // Filtrar rotas com base no parâmetro de busca
    const filteredRoutes = routes.filter(route =>
      route.routeName.toLowerCase().includes(query.toLowerCase())
    );
  
    if (filteredRoutes.length > 0) {
      res.status(200).json(filteredRoutes);
    } else {
      res.status(404).json({ message: 'Nenhuma rota encontrada.' });
    }
  };
  
  module.exports = { getRoutes };
  