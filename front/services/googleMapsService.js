import axios from 'axios';

// Usando uma variável de ambiente para armazenar a chave da API
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Função para validar a entrada
const isValidLocation = (location) => {
  return typeof location === 'string' && location.trim() !== '';
};

// Função para obter as direções
export const getDirections = async (origin, destination) => {
  if (!isValidLocation(origin) || !isValidLocation(destination)) {
    throw new Error('Origem ou destino inválidos.');
  }

  try {
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${encodedOrigin}&destination=${encodedDestination}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error('Não foi possível obter as direções.');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao obter direções:', error.message || error);
    throw new Error('Erro ao obter direções. Tente novamente mais tarde.');
  }
};

// Função para buscar detalhes da rota (distância, tempo, etc.)
export const getRouteDetails = (directionsData) => {
  if (!directionsData || !directionsData.routes || directionsData.routes.length === 0) {
    throw new Error('Nenhuma rota encontrada.');
  }

  const route = directionsData.routes[0]; // Seleciona a primeira rota
  const leg = route.legs[0]; // A primeira perna (trecho da viagem)

  // Detalhes da rota
  return {
    distance: leg.distance.text,  // Ex: "5 km"
    duration: leg.duration.text,  // Ex: "10 mins"
    startAddress: leg.start_address,
    endAddress: leg.end_address,
    steps: leg.steps.map((step, index) => ({
      instruction: step.html_instructions,  // Instrução do passo
      distance: step.distance.text,         // Distância até o próximo passo
      duration: step.duration.text          // Tempo estimado para o próximo passo
    })),
  };
};
