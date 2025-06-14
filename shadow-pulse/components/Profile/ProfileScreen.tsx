import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { shareScore } from '../Shared/SocialShare';

interface Props {
  email?: string;
  score?: number;
  onLogout?: () => void;
}

const ProfileScreen: React.FC<Props> = ({ email = "utente@anonimo.com", score = 0, onLogout }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Profilo utente</Text>
    <Text style={styles.email}>{email}</Text>
    <Text style={styles.score}>Miglior punteggio: {score}</Text>
    <TouchableOpacity style={styles.button} onPress={() => shareScore(score)}>
      <Text style={styles.buttonText}>Condividi il mio punteggio</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, { backgroundColor: "#e9446a" }]} onPress={() => {
      if(onLogout) onLogout();
      else Alert.alert('Logout', 'Funzionalità da implementare');
    }}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#101820" },
  label: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: "#00c2ff" },
  email: { fontSize: 18, color: "#fff", marginBottom: 24 },
  score: { fontSize: 20, color: "#f7b801", marginBottom: 36 },
  button: {
    backgroundColor: "#00c2ff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 18,
    marginBottom: 18,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});

