import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Массив языков
const languages = [
  { code: 'en', label: 'English' },
  { code: 'uk', label: 'Українська' },
  { code: 'ru', label: 'Русский' },
];

export default function LanguageSelection({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Функция для сохранения выбранного языка
  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('appLanguage', language);
      // Переход к следующему экрану после выбора языка
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите язык</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.button,
            selectedLanguage === lang.code && styles.selectedButton,
          ]}
          onPress={() => {
            setSelectedLanguage(lang.code);
            saveLanguage(lang.code);
          }}
        >
          <Text style={styles.buttonText}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});
