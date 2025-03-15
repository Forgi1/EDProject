import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const logout = async () => {
    try {
      await auth0.webAuth.clearSession({
        federated: true, // Logs out from all identity providers (Google, Facebook, etc.)
      });

      navigation.replace('Auth'); // Navigate back to Auth screen after logout
    } catch (error) {
      console.error('Logout failed:', JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {/* Curved Background with Logout Button */}
      <View style={styles.curvedBackground}>
        {/* Logout Button - Top Left */}
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.title}>SafePath</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomTabNavigator navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  curvedBackground: {
    width: '100%',
    height: 300,
    backgroundColor: '#007BFF',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure positioning for absolute elements
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    position: 'absolute',
    top: 50, // Adjust position to prevent overlap with notches
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.8)', // Red background with transparency
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;