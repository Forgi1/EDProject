import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const logout = async () => {
    try {
      await auth0.webAuth.clearSession();
      navigation.replace('Auth');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to edProject!</Text>
      <Button title="Logout" onPress={logout} />
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
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
