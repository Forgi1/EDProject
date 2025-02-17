import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
      {/* Title */}
      <Text style={styles.title}>
        Welcome to <Text style={styles.titleHighlight}>SafePath</Text>
      </Text>

      {/* Feature List */}
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>♿ Seamless indoor navigation </Text>
        <Text style={styles.featureDescription}>
            Get step-by-step directions to your destination targeted towards people with disabilities.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>🔎 SCAN</Text>
        <Text style={styles.featureDescription}>
          Prompt the scanning process and display any availble scans.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>🧭 NAVIGATE</Text>
        <Text style={styles.featureDescription}>
          Navigate the area with an optimzed map along with haptic feedback to match your needs.
        </Text>
      </View>

      {/* Terms & Privacy */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By pressing continue, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and that you have read our{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={login}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  titleHighlight: {
    color: '#007BFF',
  },
  featureContainer: {
    width: '100%',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  termsContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
