import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Vibration, Platform } from 'react-native';
import Tts from 'react-native-tts';

const SettingsScreen = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const toggleVoice = (value: boolean) => {
    setVoiceEnabled(value);
    if (value) {
      Tts.setDefaultLanguage('en-US');

      // ✅ Safe: only set rate on Android
      if (Platform.OS === 'android') {
        Tts.setDefaultRate(0.5);
      }

      Tts.setDefaultPitch(1.0);
      Tts.speak('Hello, welcome to SafePath');
    }
  };

  const toggleVibration = (value: boolean) => {
    setVibrationEnabled(value);
    if (value) {
      Vibration.vibrate(300); // brief test vibration
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Voice Feedback</Text>
        <Switch value={voiceEnabled} onValueChange={toggleVoice} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Vibration</Text>
        <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 18,
  },
});

export default SettingsScreen;
