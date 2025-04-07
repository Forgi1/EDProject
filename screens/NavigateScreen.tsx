import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const NavigateScreen = () => {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [goal, setGoal] = useState<{ x: number; y: number } | null>(null);
  const [fakePath, setFakePath] = useState<{ x: number; y: number }[]>([]);

  const handleMapPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;

    if (!start) {
      setStart({ x: locationX, y: locationY });
      console.log('Start set at:', locationX, locationY);
    } else if (!goal) {
      setGoal({ x: locationX, y: locationY });
      console.log('Goal set at:', locationX, locationY);

      // Fake a path once both start and goal are set
      const path = generateFakePath(start, { x: locationX, y: locationY });
      setFakePath(path);
    }
  };

  const generateFakePath = (start: { x: number; y: number }, goal: { x: number; y: number }) => {
    const points = [];
    const steps = 20; // number of points to create a smooth line
    for (let i = 0; i <= steps; i++) {
      const x = start.x + ((goal.x - start.x) * i) / steps;
      const y = start.y + ((goal.y - start.y) * i) / steps;
      points.push({ x, y });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Lobby</Text>

      <TouchableWithoutFeedback onPress={handleMapPress}>
        <View style={styles.mapContainer}>
          <Image
            source={require('../assets/scan1.png')}  
            style={styles.mapImage}
            resizeMode="contain"
          />

          {/* Start and Goal markers */}
          {start && <View style={[styles.marker, { top: start.y - 10, left: start.x - 10 }]} />}
          {goal && <View style={[styles.goalMarker, { top: goal.y - 10, left: goal.x - 10 }]} />}

          {/* Fake path line */}
          {fakePath.length > 0 && (
            <Svg style={StyleSheet.absoluteFill}>
              <Polyline
                points={fakePath.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="blue"
                strokeWidth="3"
              />
            </Svg>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.instructions}>
        {!start ? (
          <Text style={styles.text}>Tap on the map to set your starting position 📍</Text>
        ) : !goal ? (
          <Text style={styles.text}>Tap again to set your destination 🎯</Text>
        ) : (
          <Text style={styles.text}>Path is ready! ✅</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  mapContainer: {
    width: '90%',
    height: '70%',
    position: 'relative',
    backgroundColor: '#1e1e1e', // optional background behind image
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: '#fff',
  },
  goalMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: '#fff',
  },
  instructions: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default NavigateScreen;
