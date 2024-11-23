import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech'; // Importa expo-speech

export default function DetailsScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const speak = (text) => {
    Speech.speak(text); // Usa expo-speech para fala
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    if (!username || !email || !password) {
      const errorMessage = 'Todos os campos são obrigatórios!';
      Alert.alert('Erro', errorMessage);
      speak(errorMessage); // Fala a mensagem de erro
      return;
    }

    if (!validateEmail(email)) {
      const emailErrorMessage = 'Por favor, insira um e-mail válido!';
      Alert.alert('Erro', emailErrorMessage);
      speak(emailErrorMessage); // Fala a mensagem de erro
      return;
    }

    if (password.length < 6) {
      const passwordErrorMessage = 'A senha deve ter no mínimo 6 caracteres!';
      Alert.alert('Erro', passwordErrorMessage);
      speak(passwordErrorMessage); // Fala a mensagem de erro
      return;
    }

    const successMessage = 'Cadastro realizado com sucesso!';
    console.log('Dados de registro:', { username, email, password });
    Alert.alert('Sucesso', successMessage);
    speak(successMessage); // Fala a mensagem de sucesso
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Campo de Nome de Usuário"
        accessibilityHint="Insira seu nome de usuário"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        accessibilityLabel="Campo de Email"
        accessibilityHint="Insira seu e-mail"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        accessibilityLabel="Campo de Senha"
        accessibilityHint="Insira sua senha"
      />

      <Button
        title="Registrar"
        onPress={handleRegister}
        accessibilityLabel="Botão de Registro"
        disabled={!username || !email || !password}
      />
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
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
