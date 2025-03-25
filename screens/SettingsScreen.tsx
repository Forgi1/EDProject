import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Vibration,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Tts from 'react-native-tts';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-80ygjdkjffz4caq0.us.auth0.com',
  clientId: 'CFOOjLsPj1SIsXZcA2Tc5r0shChPouM5',
});

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const toggleVoice = (value: boolean) => {
    setVoiceEnabled(value);
    if (value) {
      Tts.setDefaultLanguage('en-US');
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
      Vibration.vibrate(300);
    }
  };

  const logout = async () => {
    try {
      await auth0.webAuth.clearSession({ federated: true });
      navigation.replace('Auth'); // Redirect to Auth/Login screen
    } catch (error) {
      console.error('Logout failed:', JSON.stringify(error, null, 2));
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

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
