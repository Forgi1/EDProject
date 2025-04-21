import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
// @ts-ignore
import PF from 'pathfinding';

// === Grid Setup ===
const CELL_SIZE = 9;
const GRID_WIDTH = 1034;
const GRID_HEIGHT = 369;

const NUM_COLS = Math.ceil(GRID_WIDTH / CELL_SIZE);
const NUM_ROWS = Math.ceil(GRID_HEIGHT / CELL_SIZE);

const initialGrid = Array(NUM_ROWS).fill(null).map(() => Array(NUM_COLS).fill(0));

// Tables
const table1Cells = [
  [32,10], [32, 11], [32, 12],
  [31, 10], [31, 11], [31, 12],
  [33, 10], [33, 11], [33, 12],
  [32,9], [32, 10], [32, 11],
  [31, 9], [31, 10], [31, 11],
  [33, 9], [33, 10], [33, 11],

];
const table2Cells = [
  [32, 3], [32, 4], [32, 5],
  [31, 3], [31, 4], [31,5],
  [33, 3], [33, 4], [33,5],
  [33, 4], [33, 5], [33,6],
  [32, 4], [32, 5], [32,6],
  [31, 4], [31, 5], [31,6],
];



// Bookshelf
const bookshelfCells = [
  [36, 11], [36, 12], [36, 13],
  [35, 11], [35, 12], [35, 13],
];

const bookshelf2Cells = [
  [36, 14], [36, 15], [36, 16],
  [35, 14], [35, 15], [35, 16],
];

// Couch
const couchCells = [
  [25, 36], [25, 37], [25, 38],
  [26, 36], [26, 37], [26, 38],
  [27, 36], [27, 37], [27, 38],
  [28, 36], [28, 37], [28, 38],
  [29, 36], [29, 37], [29, 38],
  [30, 36], [30, 37], [30, 38],
  [31, 36], [31, 37], [31, 38],
  [32, 36], [32, 37], [32, 38],
  [33, 36], [33, 37], [33, 38],
  [34, 36], [34, 37], [34, 38],
  [35, 36], [35, 37], [35, 38],
  
  [33, 35], [33, 36], [33, 35],
  [33, 34], [33, 35], [33, 36],
  [33, 33], [33, 34], [33, 35],
  

  [34, 35], [34, 36], [34, 37],
  [34, 34], [34, 35], [34, 36],
  [34, 33], [34, 34], [34, 35],
  [34, 32], [34, 33], [34, 34],
  [34, 31], [34, 32], [34, 33],
  [34, 30], [34, 31], [34, 32],
  

  [35, 35], [35, 36], [35, 37],
  [35, 34], [35, 35], [35, 36],
  [35, 33], [35, 34], [35, 35],
  [35, 32], [35, 33], [35, 34],
  [35, 31], [35, 32], [35, 33],
  [35, 30], [35, 31], [35, 32],
  [35, 29], [35, 30], [35, 31],
  [35, 28], [35, 29], [35, 30],
  [35, 27], [35, 28], [35, 29],
  [35, 26], [35, 27], [35, 28],
  

  [36, 35], [36, 36], [36, 37],
  [36, 34], [36, 35], [36, 36],
  [36, 33], [36, 34], [36, 35],
  [36, 32], [36, 33], [36, 34],
  [36, 31], [36, 32], [36, 33],
  [36, 30], [36, 31], [36, 32],
  [36, 29], [36, 30], [36, 31],
  [36, 28], [36, 29], [36, 30],
  [36, 27], [36, 28], [36, 29],
  [36, 26], [36, 27], [36, 28],
  [36, 25], [36, 26], [36, 27],
  [36, 24], [36, 25], [36, 26],

  [37, 35], [37, 36], [37, 37],
  [37, 34], [37, 35], [37, 36],
  [37, 33], [37, 34], [37, 35], 
  [37, 32], [37, 33], [37, 34],
  [37, 31], [37, 32], [37, 33],
  [37, 30], [37, 31], [37, 32],
  [37, 29], [37, 30], [37, 31],
  [37, 28], [37, 29], [37, 30],
  [37, 27], [37, 28], [37, 29],
  [37, 26], [37, 27], [37, 28],
  [37, 25], [37, 26], [37, 27],
  [37, 24], [37, 25], [37, 26],
  [37, 23], [37, 24], [37, 25],
  [37, 22], [37, 23], [37, 24],
  [37, 21], [37, 22], [37, 23],

];

const bounderies=[[24, 36], [24, 37], [24, 38],
[23, 36], [23, 37], [23, 38],
[22, 36], [22, 37], [22, 38],
[21, 36], [21, 37], [21, 38],
[20, 36], [20, 37], [20, 38],
[19, 36], [19, 37], [19, 38],
[38, 20], [38, 21], [38, 22]]

// Paint obstacles
table1Cells.forEach(([row, col]) => initialGrid[row][col] = 1);
table2Cells.forEach(([row, col]) => initialGrid[row][col] = 1);
bookshelfCells.forEach(([row, col]) => initialGrid[row][col] = 1);
bookshelf2Cells.forEach(([row, col]) => initialGrid[row][col] = 1);
couchCells.forEach(([row, col]) => initialGrid[row][col] = 1);
bounderies.forEach(([row, col]) => initialGrid[row][col] = 1);
// === NavigateScreen Component ===
const NavigateScreen = () => {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [goal, setGoal] = useState<{ x: number; y: number } | null>(null);
  const [fakePath, setFakePath] = useState<{ x: number; y: number }[]>([]);
  const [visiblePath, setVisiblePath] = useState<{ x: number; y: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [wheelchairMode, setWheelchairMode] = useState(false);

  const handleMapPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
  
    const col = Math.floor(locationX / CELL_SIZE);
    const row = Math.floor(locationY / CELL_SIZE);
  
    // ⛔️ Don't allow clicks outside the visible white scan area (e.g., above row 24)
    if (row < 24 || row > 38) {
      console.log(`Ignored tap at (${row}, ${col}) - outside white scan area`);
      return;
    }
  
    if (!start) {
      setStart({ x: col, y: row });
    } else if (!goal) {
      setGoal({ x: col, y: row });
  
      const gridBackup = new PF.Grid(expandedGrid(initialGrid));
      const finder = new PF.AStarFinder({
        allowDiagonal: true,
        heuristic: PF.Heuristic.manhattan,
      });
  
      const path = finder.findPath(start.x, start.y, col, row, gridBackup);
  
      const pixelPath = path.map(([gridX, gridY]: [number, number]) => ({
        x: gridX * CELL_SIZE + CELL_SIZE / 2,
        y: gridY * CELL_SIZE + CELL_SIZE / 2,
      }));
  
      setFakePath(pixelPath);
      setModalVisible(true);
    } else {
      // Reset on third tap
      setStart({ x: col, y: row });
      setGoal(null);
      setFakePath([]);
      setVisiblePath([]);
    }
  };
  const handleReset = () => {
    setStart(null);
    setGoal(null);
    setFakePath([]);
    setVisiblePath([]);
  };  

  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculatePathDistanceInFeet = (path: { x: number; y: number }[]): number => {
    let total = 0;
    for (let i = 1; i < path.length; i++) {
      const dx = path[i].x - path[i - 1].x;
      const dy = path[i].y - path[i - 1].y;
      const distPixels = Math.sqrt(dx * dx + dy * dy);
      total += distPixels;
    }
  
    const feetPerPixel = 1.2;
    return total * feetPerPixel/9;
  };
  

  const expandedGrid = (grid: number[][]) => {
    if (!wheelchairMode) return grid; // Regular mode

    const newGrid = grid.map(row => [...row]); // Deep copy

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (grid[row][col] === 1) {
          // Block surrounding cells too
          const deltas = [
            [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
            [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
          ];
          deltas.forEach(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < NUM_ROWS && newCol >= 0 && newCol < NUM_COLS) {
              newGrid[newRow][newCol] = 1;
            }
          });
        }
      }
    }

    return newGrid;
  };

  useEffect(() => {
    if (fakePath.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < fakePath.length) {
          setVisiblePath(fakePath.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [fakePath]);

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
          {/* Draw the red box */}
{/*
{expandedGrid(initialGrid).map((row, rowIndex) =>
  row.map((cell, colIndex) =>
    cell === 1 ? (
      <View
        key={`${rowIndex}-${colIndex}`}
        style={{
          position: 'absolute',
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          left: colIndex * CELL_SIZE,
          top: rowIndex * CELL_SIZE,
        }}
      />
    ) : null
  )
)}
*/}
{/* Draw the red box */}


{/* Draw the grid */}

 {/*
{Array(NUM_ROWS).fill(0).map((_, rowIndex) =>
  Array(NUM_COLS).fill(0).map((_, colIndex) => (
    <View
      key={`${rowIndex}-${colIndex}`}
      style={{
        position: 'absolute',
        width: CELL_SIZE,
        height: CELL_SIZE,
        left: colIndex * CELL_SIZE,
        top: rowIndex * CELL_SIZE,
        borderWidth: 0.2,
        borderColor: 'rgba(0, 0, 0, 0.94)', // subtle grid
      }}
    />
  ))
)}

*/}


          {/* Start Marker */}
          {start && (
            <View style={[styles.marker, { top: start.y * CELL_SIZE, left: start.x * CELL_SIZE }]} />
          )}

          {/* Goal Marker */}
          {goal && (
            <View style={[styles.goalMarker, { top: goal.y * CELL_SIZE, left: goal.x * CELL_SIZE }]} />
          )}

          {/* Path Line */}
          {visiblePath.length > 0 && (
            <Svg style={StyleSheet.absoluteFill}>
              <Polyline
                points={visiblePath.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="blue"
                strokeWidth="3"
              />
            </Svg>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Instructions */}
      <View style={styles.instructions}>
        {!start ? (
          <Text style={styles.text}>Tap to set your starting position 📍</Text>
        ) : !goal ? (
          <Text style={styles.text}>Tap to set your destination 🎯</Text>
        ) : (
          <Text style={styles.text}>Path is ready! ✅</Text>
        )}

        {/* Distance */}
        {visiblePath.length > 1 && (
  <Text style={styles.text}>
    Distance: {calculatePathDistanceInFeet(visiblePath).toFixed(1)} ft
  </Text>
)}


        {/* Reset Button */}
        {start && goal && (
          <Text style={styles.resetButton} onPress={handleReset}>
            Reset 🔁
          </Text>
        )}

        {/* Wheelchair Mode Toggle */}
        <Text
          style={[
            styles.wheelchairButton,
            wheelchairMode && { backgroundColor: '#32CD32' },
          ]}
          onPress={() => setWheelchairMode(prev => !prev)}
        >
          {wheelchairMode ? 'Wheelchair Mode: ON ♿' : 'Wheelchair Mode: OFF'}
        </Text>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Path Ready! ✅</Text>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NavigateScreen;

// === Styles ===
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
    marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    width: '90%',
    height: '70%',
    position: 'relative',
    backgroundColor: '#1e1e1e',
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
  resetButton: {
    fontSize: 18,
    color: '#00BFFF',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  wheelchairButton: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 15,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

