import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import ScoreBoard from './ScoreBoard';
import Shape, { ShapeType } from './Shape';
import { shareScore } from '../Shared/SocialShare';
import { saveUserScore, getUserScore } from '../../utils/scoreHelpers';

const GAME_TIME = 30; // durata della partita in secondi
const allShapes: ShapeType[] = ['heart', 'star', 'circle', 'triangle', 'bolt', 'hand'];

type GameState = 'ready' | 'running' | 'ended';

const BEST_SCORE_KEY = 'shadowpulse_bestscore';

const GameScreen: React.FC = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [currentShape, setCurrentShape] = useState<ShapeType | null>(null);
  const [isMirror, setIsMirror] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Carica il best score locale
  useEffect(() => {
    const loadBestScore = async () => {
      const s = await AsyncStorage.getItem(BEST_SCORE_KEY);
      if (s) setBestScore(Number(s));
    };
    loadBestScore();
  }, []);

  // Inizio partita
  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameState('running');
    nextShape();
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'running') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line
  }, [gameState]);
  useEffect(() => { 
  if (gameState === 'ready') {
    getUserScore().then(setBestScore);
  }
}, [gameState]);

  // Genera una nuova sagoma casuale
  const nextShape = () => {
    setIsMirror(Math.random() < 0.2); // 20% ombra
    setCurrentShape(allShapes[Math.floor(Math.random() * allShapes.length)]);
  };

  // Tap sulla sagoma
  const handleTap = () => {
    if (gameState !== 'running' || currentShape === null) return;
    if (!isMirror) {
      setScore((s) => s + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    else {
      setScore((s) => Math.max(0, s - 1));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    nextShape();
  };

  // Salva best score e termina
  const endGame = async () => {
  setGameState('ended');
  if (score > bestScore) {
    setBestScore(score);
    await saveUserScore(score);
    Alert.alert("Nuovo record!", `Complimenti, nuovo best score: ${score}`);
  }
};

  return (
    <View style={styles.container}>
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <Text style={styles.bestScore}>Best: {bestScore}</Text>
      {gameState === 'ready' && (
        <TouchableOpacity style={styles.startBtn} onPress={startGame}>
          <Text style={styles.startBtnText}>Inizia la partita</Text>
        </TouchableOpacity>
      )}

      {gameState === 'running' && currentShape && (
        <TouchableOpacity
          style={styles.shapeContainer}
          onPress={handleTap}
          activeOpacity={0.7}
        >
          <Shape type={currentShape} mirror={isMirror} />
          {isMirror && (
            <Text style={styles.mirrorHint}>
              Non premere! (ombra specchiata)
            </Text>
          )}
        </TouchableOpacity>
      )}

      {gameState === 'ended' && (
        <View style={styles.resultContainer}>
          <Text style={styles.finalScore}>
            Partita terminata! Punteggio: {score}
          </Text>
          <Text style={styles.bestScoreBig}>Record: {bestScore}</Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Rigioca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => shareScore(score)}>
            <Text style={styles.buttonText}>Condividi risultato</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  bestScore: {
    color: '#4D7CFE',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 12,
  },
  bestScoreBig: {
    color: '#307AFF',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
  shapeContainer: {
    marginVertical: 32,
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#999',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    position: 'relative',
  },
  mirrorHint: {
    color: '#E83A3A',
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 18,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 30,
    gap: 16,
  },
  finalScore: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  button: {
    backgroundColor: '#307AFF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 14,
    marginVertical: 8,
    elevation: 2,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  startBtn: {
    backgroundColor: '#0af',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 18,
    marginTop: 28,
    elevation: 2,
  },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
});

export default GameScreen;

