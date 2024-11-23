import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SearchRoutes = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor, digite o nome ou número da rota.');
      return;
    }
    setError('');
    setLoading(true); // Inicia o carregamento
    try {
      await onSearch(query); // Espera a busca ser concluída
    } catch (e) {
      console.error('Erro ao buscar rota:', e);
    } finally {
      setLoading(false); // Finaliza o carregamento após a busca
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da rota ou número"
        value={query}
        onChangeText={setQuery}
      />
      {/* Substituir o botão padrão por um TouchableOpacity personalizado */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Aplica estilo diferente se estiver carregando
        onPress={handleSearch}
        disabled={loading} // Desativa o botão se estiver carregando
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff', // Cor do botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#b0c4de', // Cor do botão quando desativado
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SearchRoutes;
