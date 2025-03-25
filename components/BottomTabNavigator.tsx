import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTabNavigator = ({ navigation }: { navigation: any }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const navigateTo = (screen: string) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Scan' && styles.activeTab]}
        onPress={() => navigateTo('Scan')}>
        <Text style={[styles.tabText, activeTab === 'Scan' && styles.activeTabText]}> Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Navigate' && styles.activeTab]}
        onPress={() => navigateTo('Navigate')}>
        <Text style={[styles.tabText, activeTab === 'Navigate' && styles.activeTabText]}> Navigate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Settings' && styles.activeTab]}
        onPress={() => navigateTo('Settings')}>
        <Text style={[styles.tabText, activeTab === 'Settings' && styles.activeTabText]}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTab: {
    backgroundColor: '#302f30',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
