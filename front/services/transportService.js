// TransportScreen.js
import React, { useState } from 'react';
import { getBusLines, getRouteDetails, getVehicleLocations } from './services/transportService'; // Importando o serviço

const TransportScreen = () => {
  const [busLines, setBusLines] = useState([]);
  const [routeDetails, setRouteDetails] = useState(null);
  const [vehicleLocations, setVehicleLocations] = useState(null);
  const [error, setError] = useState(null);

  // Função para buscar as linhas de ônibus
  const fetchBusLines = async () => {
    try {
      const lines = await getBusLines();
      setBusLines(lines); // Atualiza o estado com as linhas de ônibus
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Função para buscar o itinerário de uma linha
  const fetchRouteDetails = async (lineNumber) => {
    try {
      const details = await getRouteDetails(lineNumber);
      setRouteDetails(details); // Atualiza o estado com o itinerário
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Função para buscar a localização dos veículos
  const fetchVehicleLocations = async (lineNumber) => {
    try {
      const locations = await getVehicleLocations(lineNumber);
      setVehicleLocations(locations); // Atualiza o estado com a localização dos veículos
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Informações sobre Transporte Público</h1>

      {/* Botão para buscar as linhas de ônibus */}
      <button onClick={fetchBusLines}>Buscar Linhas de Ônibus</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exibir as linhas de ônibus */}
      {busLines.length > 0 && (
        <div>
          <h2>Linhas de Ônibus Disponíveis:</h2>
          <ul>
            {busLines.map((line) => (
              <li key={line.id}>
                Linha {line.numero} - {line.nome}
                <button onClick={() => fetchRouteDetails(line.numero)}>Ver Itinerário</button>
                <button onClick={() => fetchVehicleLocations(line.numero)}>Ver Localização dos Veículos</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exibir o itinerário de uma linha */}
      {routeDetails && (
        <div>
          <h2>Itinerário da Linha:</h2>
          <ul>
            {routeDetails.map((stop, index) => (
              <li key={index}>
                {stop.nome}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exibir a localização dos veículos */}
      {vehicleLocations && (
        <div>
          <h2>Localização dos Veículos:</h2>
          <ul>
            {vehicleLocations.map((vehicle, index) => (
              <li key={index}>
                Veículo {vehicle.id} - Localização: {vehicle.latitude}, {vehicle.longitude}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransportScreen;
