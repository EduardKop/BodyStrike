import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Данные для слайдов инструктажа
const slides = {
  en: [
    { id: '1', title: 'Track your nutrition', description: 'Manage your diet effectively.' },
    { id: '2', title: 'Monitor your weight', description: 'Stay on top of your progress.' },
    { id: '3', title: 'Get weekly insights', description: 'Receive analytics to improve.' },
  ],
  uk: [
    { id: '1', title: 'Відстежуйте харчування', description: 'Керуйте дієтою ефективно.' },
    { id: '2', title: 'Контролюйте вагу', description: 'Стежте за своїм прогресом.' },
    { id: '3', title: 'Отримуйте аналітику', description: 'Покращуйте результати щотижня.' },
  ],
  ru: [
    { id: '1', title: 'Отслеживайте питание', description: 'Управляйте своим рационом эффективно.' },
    { id: '2', title: 'Контролируйте вес', description: 'Следите за своим прогрессом.' },
    { id: '3', title: 'Получайте аналитику', description: 'Улучшайте результаты каждую неделю.' },
  ],
};

export default function Onboarding({ navigation }) {
  const [language, setLanguage] = useState('en'); // Default language
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Получаем язык из AsyncStorage
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('appLanguage');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    fetchLanguage();
  }, []);

  const handleNext = () => {
    if (currentSlideIndex < slides[language].length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate('UserDetails'); // Переход к следующему экрану
    }
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[slides[language][currentSlideIndex]]}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentSlideIndex < slides[language].length - 1 ? 'Next' : 'Start'}
        </Text>
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
  },
  slide: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
