import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';

const ScanScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan Room Screen</Text>
      <BottomTabNavigator navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ScanScreen;
