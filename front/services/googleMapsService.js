// services/googleMapsService.js

import axios from 'axios';

// Usando uma variável de ambiente para armazenar a chave da API
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; 

// Função para validar a entrada
const isValidLocation = (location) => {
  return typeof location === 'string' && location.trim() !== '';
};

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
