import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';  // Importando Tesseract.js

export default function TextRecognitionScreen() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  // Função para selecionar a imagem
  const pickImage = async () => {
    // Solicitar permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões para acessar a galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      recognizeText(result.uri);
    }
  };

  // Função para reconhecer o texto na imagem com Tesseract.js
  async function recognizeText(imagePath) {
    try {
      Tesseract.recognize(
        imagePath,
        'eng',  // Idioma da imagem (inglês)
        {
          logger: (m) => console.log(m),  // Log de progresso
        }
      ).then(({ data: { text } }) => {
        setRecognizedText(text);
        console.log('Texto reconhecido:', text);
      });
    } catch (error) {
      console.error('Erro ao reconhecer o texto:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {recognizedText ? <Text style={styles.text}>{recognizedText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
