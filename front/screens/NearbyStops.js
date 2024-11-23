import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import PushNotification from 'react-native-push-notification';

const NearbyStops = () => {
  const [stops, setStops] = useState([]);
  
  useEffect(() => {
    const fetchLocation = async () => {
      // Solicita permissão para acessar a localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização não concedida!');
        Alert.alert('Erro', 'Permissão de localização não concedida!');
        return;
      }

      // Obtém a localização atual do usuário
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchNearbyStops(latitude, longitude);
    };

    fetchLocation();
  }, []);

  const fetchNearbyStops = async (latitude, longitude) => {
    // Substitua pela URL da sua API de transporte público
    const apiUrl = `https://api.transporte-publico.com/nearby?lat=${latitude}&lon=${longitude}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.stops && data.stops.length > 0) {
        setStops(data.stops); // Armazena as paradas no estado
        // Notifique o usuário sobre as paradas próximas
        notifyUser(data.stops);
      } else {
        Alert.alert('Aviso', 'Nenhuma parada próxima encontrada.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar as paradas.');
    }
  };

  const notifyUser = (stops) => {
    stops.forEach(stop => {
      PushNotification.localNotification({
        title: 'Parada Próxima',
        message: `Você está perto da parada: ${stop.name}`,
      });
    });
  };

  return (
    <View>
      <Text>Buscando paradas de transporte próximas...</Text>
      {/* Exibe as paradas encontradas na interface */}
      {stops.length > 0 ? (
        stops.map((stop, index) => (
          <Text key={index}>{stop.name}</Text>
        ))
      ) : (
        <Text>Sem paradas próximas.</Text>
      )}
    </View>
  );
};

export default NearbyStops;
