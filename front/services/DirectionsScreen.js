import React, { useState } from 'react';
import { fetchRouteDetails } from './services/routeService'; // Serviço centralizado

const DirectionsScreen = () => {
  const [routeDetails, setRouteDetails] = useState(null);
  const [error, setError] = useState(null);

  // Definir a linha preestabelecida aqui
  const predefinedLineNumber = '123'; // Número fixo da linha do veículo (por exemplo, ônibus linha 123)

  const showDirections = async (origin, destination) => {
    try {
      const details = await fetchRouteDetails(origin, destination); // Usando o serviço para buscar a rota
      setRouteDetails(details); // Atualiza o estado com os detalhes da rota
      setError(null); // Reseta o erro caso tenha sucesso
    } catch (error) {
      setError(error.message); // Caso haja erro, setar a mensagem de erro
      setRouteDetails(null); // Reseta os detalhes da rota em caso de erro
    }
  };

  return (
    <div>
      <h1>Buscar Direções</h1>

      <button onClick={() => showDirections('Av. Afonso Pena, Belo Horizonte', 'Praça da Liberdade, Belo Horizonte')}>
        Buscar Rota
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {routeDetails && (
        <div>
          <h2>Detalhes da Rota:</h2>
          <p><strong>Distância:</strong> {routeDetails.distance}</p>
          <p><strong>Duração:</strong> {routeDetails.duration}</p>
          <p><strong>Endereço de Início:</strong> {routeDetails.startAddress}</p>
          <p><strong>Endereço de Destino:</strong> {routeDetails.endAddress}</p>

          {/* Aqui você pode exibir a linha preestabelecida */}
          <h3>Informações sobre a Linha {predefinedLineNumber}:</h3>
          <p>Você está buscando informações sobre a linha de número: {predefinedLineNumber}</p>

          <h3>Passos da Rota:</h3>
          <ol>
            {routeDetails.steps.map((step, index) => (
              <li key={index}>
                {step.instruction} - {step.distance}, {step.duration}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default DirectionsScreen;
