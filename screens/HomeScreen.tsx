
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';

const tripSuggestions = [
  {
    id: '1',
    title: 'Scan Area',
    subtitle: 'Look for availible SafePath scans',
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
    navigateTo: 'Settings',
  },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const handleCardPress = (item: any) => {
    if (item.navigateTo) {
      navigation.navigate(item.navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.curvedBackground}>
        <Text style={styles.title}>SafePath</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Plan your next move</Text>
        <FlatList
          data={tripSuggestions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

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
    width: '110%',
    height: 250,
    backgroundColor: '#1e1e1e',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 25,
    fontFamily: 'San Francisco',
    color: '#fff',
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
