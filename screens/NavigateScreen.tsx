import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NavigateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Scans are currently available</Text>
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
  },
});

export default NavigateScreen;
