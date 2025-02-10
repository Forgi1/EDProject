import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const logout = async () => {
    try {
      await auth0.webAuth.clearSession();
      navigation.replace('Auth'); // Navigate to Auth screen after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logout Button - Top Left */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>SafePath Indoor Navigator</Text>

      {/* Buttons - Middle Left with Spacing */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
          <Text style={styles.buttonText}>SCAN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Navigate')}>
          <Text style={styles.buttonText}>NAVIGATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'flex-start',
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  logoutText: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -5,
  },
  button: {
    backgroundColor: '#4CAF50', // Green background
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 10, // Soft edges
    borderWidth: 2,
    borderColor: '#000000', // Darker green border
    marginVertical: 10, // Add vertical spacing between buttons
    alignItems: 'center',
    width: 105, // Set button width
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

