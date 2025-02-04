import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const AuthScreen = ({ navigation }: { navigation: any }) => {
  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        redirectUrl: 'org.reactjs.native.example.edProject://dev-80ygjdkjffz4caq0.us.auth0.com/ios/org.reactjs.native.example.edProject/callback',
      });
      console.log(credentials);
      navigation.replace('Home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to edProject</Text>
      <Button title="Login with Auth0" onPress={login} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AuthScreen;
