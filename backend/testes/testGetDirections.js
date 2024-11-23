// testGetDirections.js
import { getDirections } from './services/googleMapsService';

const fetchDirections = async () => {
  try {
    const origin = 'São Paulo, SP';
    const destination = 'Rio de Janeiro, RJ';
    const directions = await getDirections(origin, destination);
    console.log('Direções:', directions);
  } catch (error) {
    console.error('Erro ao buscar direções:', error);
  }
};

fetchDirections();
