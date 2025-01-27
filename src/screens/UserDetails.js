import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Локализация текстов
const localizedTexts = {
  en: {
    title: 'Enter your details',
    weightLabel: 'Enter your weight',
    heightLabel: 'Enter your height',
    next: 'Next',
    error: 'Please enter both height and weight.',
  },
  uk: {
    title: 'Введіть ваші дані',
    weightLabel: 'Укажіть свою вагу',
    heightLabel: 'Укажіть свій зріст',
    next: 'Далі',
    error: 'Будь ласка, введіть і зріст, і вагу.',
  },
  ru: {
    title: 'Введите ваши данные',
    weightLabel: 'Укажите свой вес',
    heightLabel: 'Укажите свой рост',
    next: 'Далее',
    error: 'Пожалуйста, введите и рост, и вес.',
  },
};

export default function UserDetails({ navigation }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [language, setLanguage] = useState('en'); // Язык по умолчанию

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('appLanguage');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    fetchLanguage();
  }, []);

  const handleNext = async () => {
    if (!height || !weight) {
      Alert.alert('Error', localizedTexts[language].error);
      return;
    }

    try {
      // Сохраняем данные в AsyncStorage
      await AsyncStorage.setItem('userHeight', height);
      await AsyncStorage.setItem('userWeight', weight);
      navigation.navigate('UserActivity'); // Переход к следующему экрану
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localizedTexts[language].title}</Text>

      <Text style={styles.label}>{localizedTexts[language].weightLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>{localizedTexts[language].heightLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{localizedTexts[language].next}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
