// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  // Exemplo de dados do usuário (isso seria idealmente obtido de um estado global ou banco de dados)
  const user = {
    username: 'Isaac Ferreira',
    email: 'isaac@example.com',
  };

  const handleLogout = () => {
    // Lógica de logout, por exemplo, limpar token de autenticação
    // navigation.navigate('HomeScreen'); // Navega de volta para a tela inicial
    alert('Você foi deslogado.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Perfil</Text>
      <Text style={styles.userInfo}>Nome: {user.username}</Text>
      <Text style={styles.userInfo}>Email: {user.email}</Text>

      {/* Botão de logout */}
      <Button title="Sair" onPress={handleLogout} color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
