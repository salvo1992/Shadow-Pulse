import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, timeLeft }) => (
  <View style={styles.container}>
    <Text style={styles.score}>Punteggio: {score}</Text>
    <Text style={styles.time}>Tempo: {timeLeft}s</Text>
  </View>
);

export default ScoreBoard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  time: {
    color: '#f7b801',
    fontWeight: 'bold',
    fontSize: 22,
  },
});


