import React, { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Importa o MapView e o Marker
import SearchRoutes from './SearchRoutes';

const SearchRoutesScreen = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRoutes = async (query) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/routes?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setRoutes(data);
      } else {
        setRoutes([]);
        setError('Nenhuma rota encontrada.');
      }
    } catch (error) {
      setError('Erro ao buscar rotas. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchRoutes onSearch={fetchRoutes} />

      {/* Exibindo o mapa com as rotas, logo abaixo da pesquisa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -19.916681, // Coordenada inicial para Belo Horizonte
            longitude: -43.934493,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {routes.map((route) => (
            // Criar um marcador para cada parada da rota
            route.stops.map((stop, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: stop.latitude, // Exemplo de coordenada de parada
                  longitude: stop.longitude,
                }}
                title={route.routeName}
                description={`Parada: ${stop.name}`}
              />
            ))
          ))}
        </MapView>
      </View>

      {loading && <ActivityIndicator size="large" color="green" style={styles.loading} />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.routeItem}>
              <Text style={styles.routeName}>Rota: {item.routeName}</Text>
              <Text>Horário: {item.schedule}</Text>
              <Text>Paradas: {item.stops}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loading: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  routeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 400, // Defina o tamanho do mapa
    marginVertical: 30, // Adiciona uma margem vertical para separar o mapa dos outros elementos
  },
  map: {
    flex: 1,
  },
});

export default SearchRoutesScreen;
