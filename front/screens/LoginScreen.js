import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carregamento

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se o login for bem-sucedido, navegue para a tela principal
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('HomeScreen'); // Usando replace para evitar voltar à tela de login
      } else {
        Alert.alert('Erro', data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome:"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Campo de nome de usuário"
        accessibilityHint="Digite seu nome de usuário"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha:"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite sua senha"
      />

      {/* Mostrar indicador de carregamento enquanto processa o login */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} accessibilityLabel="Botão para login" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  loader: {
    marginVertical: 20,
  },
});
