// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/emrota.jpg')} // Certifique-se de que o caminho está correto
        style={styles.logo}
      />
      <Text style={styles.text}>Bem-vindo ao seu App EMROTA!</Text>

      {/* Botão para Cadastro */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Ir para Cadastro</Text>
      </TouchableOpacity>

      {/* Botão para Login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ir para Login</Text>
      </TouchableOpacity>

      {/* Botão para Reconhecimento de Texto */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TextRecognition')}>
        <Text style={styles.buttonText}>Ir para Reconhecimento de Texto</Text>
      </TouchableOpacity>

      {/* Botão para Pesquisa de Rotas */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchRoutes')}>
        <Text style={styles.buttonText}>Pesquisar Rotas de Veículos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  logo: {
    width: 700, // Ajuste a largura conforme necessário
    height: 200, // Ajuste a altura conforme necessário
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Cor do fundo do botão
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20, // Bordas arredondadas
    marginVertical: 10, // Espaçamento entre os botões
    width: '80%', // Largura ajustável
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Cor do texto
    fontSize: 18, // Tamanho do texto
    fontWeight: 'bold', // Negrito
  },
});
