import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
    
            navigation.replace('Auth'); // Navigate back to Auth screen after successful logout
        } catch (error) {
            console.error('Logout failed:', JSON.stringify(error, null, 2));
        }
    };
      
      
      
      
      

  return (
    <View style={styles.container}>
      {/* Logout Button - Top Left */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Title with Border */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SafePath Indoor Navigator</Text>
      </View>

      {/* Banner with Tiny Image */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Helping you navigate unknown spaces with ease</Text>
        <Image source={require('../assets/appLogo.png')} style={styles.bannerImage} />
      </View>

      {/* Buttons - Middle Left with Spacing */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
          <Text style={styles.buttonText}>Scan </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Navigate')}>
          <Text style={styles.buttonText}>Navigate </Text>
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
  titleContainer: {
    alignSelf: 'center',
    borderWidth: 2, // Black border around title
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  banner: {
    flexDirection: 'row', // Aligns text and image horizontally
    backgroundColor: '#e0e0e0', // Light gray background
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between', // Text on left, image on right
    width: '100%',
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Ensures text takes up space properly
  },
  bannerImage: {
    width: 30, // Tiny image size
    height: 30,
    borderRadius: 5, // Soft corners
    marginLeft: 10, // Space between text and image
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    marginVertical: 20,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
