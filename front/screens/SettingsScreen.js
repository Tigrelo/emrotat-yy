import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [highContrast, setHighContrast] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleHighContrast = () => setHighContrast((prevState) => !prevState);
  const toggleNotifications = () => setNotificationsEnabled((prevState) => !prevState);

  return (
    <View style={[styles.container, highContrast && styles.highContrast]}>
      <Text style={[styles.title, highContrast && styles.highContrastText]}>Tela de Configurações</Text>
      
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, highContrast && styles.highContrastText]}>Ativar Contraste Alto</Text>
        <Switch
          value={highContrast}
          onValueChange={toggleHighContrast}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, highContrast && styles.highContrastText]}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => alert('Configurações salvas!')}>
        <Text style={styles.saveButtonText}>Salvar Configurações</Text>
      </TouchableOpacity>
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
  highContrast: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  highContrastText: {
    color: '#FFF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
