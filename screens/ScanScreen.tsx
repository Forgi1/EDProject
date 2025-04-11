import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// 👇 Change this import
import { StackNavigationProp } from '@react-navigation/stack';

// Define the Scan type
type Scan = {
  id: string;
  name: string;
};

// Define your stack navigation routes (matching your App.tsx setup)
type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Scan: undefined;
  Navigate: { scan?: Scan }; // Pass the selected scan optionally
  Settings: undefined;
  Auth: undefined;
};

type ScanScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Scan'>;
};

const sampleScans: Scan[] = [
  { id: '1', name: '101 Classroom' },
  { id: '2', name: 'Building A - 2nd Floor' },
  { id: '3', name: 'Main Lobby' },
  { id: '4', name: 'Library - North Wing' }
];

const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const handleSelectScan = (scan: Scan) => {
    setSelectedScan(scan);
    console.log('Selected Scan:', scan.name);

    // (Later) you can navigate and pass the selected scan to Navigate screen
    // navigation.navigate('Navigate', { scan });
  };

  const renderScanItem = ({ item }: { item: Scan }) => (
    <TouchableOpacity
      style={[
        styles.scanItem,
        selectedScan?.id === item.id && styles.selectedScanItem
      ]}
      onPress={() => handleSelectScan(item)}
    >
      <Text style={styles.scanText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Scan</Text>
      <FlatList
        data={sampleScans}
        keyExtractor={(item) => item.id}
        renderItem={renderScanItem}
        contentContainerStyle={styles.list}
      />
      {selectedScan && (
        <Text style={styles.selectedText}>Selected: {selectedScan.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  scanItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedScanItem: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  scanText: {
    fontSize: 18,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ScanScreen;
