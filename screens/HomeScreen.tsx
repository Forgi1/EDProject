import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const tripSuggestions = [
  {
    id: '1',
    title: 'Scan Area',
    subtitle: 'Look for nearby SafePath zones',
    image: require('../assets/scan.png'),
  },
  {
    id: '2',
    title: 'Navigate',
    subtitle: 'Get walking directions to safety',
    image: require('../assets/navigate.png'),
  },
  {
    id: '3',
    title: 'Settings',
    subtitle: 'Customize your SafePath experience',
    image: require('../assets/settings.png'),
  },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const logout = async () => {
    try {
      await auth0.webAuth.clearSession({
        federated: true,
      });
      navigation.replace('Auth');
    } catch (error) {
      console.error('Logout failed:', JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {/* Curved Background with Logout Button */}
      <View style={styles.curvedBackground}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.title}>SafePath</Text>
      </View>

      {/* Scrollable Suggestions Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Plan your next move</Text>
        <FlatList
          data={tripSuggestions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomTabNavigator navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  curvedBackground: {
    width: '100%',
    height: 250,
    backgroundColor: '#302f30',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 25,
    fontFamily: 'San Francisco', // Optional: custom font
    color: '#fff',
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    width: 200,
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default HomeScreen;
