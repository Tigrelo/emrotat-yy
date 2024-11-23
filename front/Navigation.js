// Navigation.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import LoginScreen from './screens/LoginScreen';
import TextRecognitionScreen from './screens/TextRecognitionScreen';
import NearbyStops from './screens/NearbyStops';
import SearchRoutesScreen from './screens/SearchRoutesScreen';
import { configurePushNotifications } from './services/NotificationService'; // Atualize o caminho de importação


const Stack = createStackNavigator();

const Navigation = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      await configurePushNotifications();
    };
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TextRecognition" component={TextRecognitionScreen} />
        <Stack.Screen name="NearbyStops" component={NearbyStops} />
        <Stack.Screen name="SearchRoutes" component={SearchRoutesScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
