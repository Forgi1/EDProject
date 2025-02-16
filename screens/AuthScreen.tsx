import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const AuthScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = React.useState(true);

  // Check for existing session when the component loads
  useEffect(() => {
    const checkUserSession = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Home'); // Skip login if token exists
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        redirectUrl: 'org.reactjs.native.example.edProject://dev-80ygjdkjffz4caq0.us.auth0.com/ios/org.reactjs.native.example.edProject/callback',
      });

      console.log('User logged in:', credentials);

      // Save token to AsyncStorage
      await AsyncStorage.setItem('userToken', credentials.idToken);

      // Navigate to Home screen
      navigation.replace('Home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafePath Indoor Navigator</Text>
      <Text style={styles.subheading}>Your guide to seamless indoor navigation</Text>
      <Button title="Login with Auth0 to continue" onPress={login} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default AuthScreen;
