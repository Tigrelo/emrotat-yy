import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Obter a largura da tela

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/emrota.png')} // Certifique-se de que o caminho está correto
        style={styles.logo}
        resizeMode="contain" // Ajusta a imagem para caber no espaço definido
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
    width: width * 0.8, // 80% da largura da tela
    height: width * 0.5, // 50% da largura da tela
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
