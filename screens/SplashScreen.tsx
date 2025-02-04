import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [dots, setDots] = useState('.');

  // Navigate to AuthScreen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth'); // Navigate to Auth screen
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);

    return () => clearInterval(dotsTimer); // Cleanup dots animation
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/appLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome!{dots}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
