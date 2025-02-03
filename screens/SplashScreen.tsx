import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const SplashScreen = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);

    return () => clearInterval(dotsTimer);
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
    backgroundColor: '#4CAF50',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
