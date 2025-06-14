import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Tipi di sagoma disponibili
export type ShapeType = 'heart' | 'star' | 'circle' | 'triangle' | 'bolt' | 'hand';

interface ShapeProps {
  type: ShapeType;
  mirror?: boolean;
}

const iconMap: Record<ShapeType, React.ComponentProps<typeof FontAwesome5>['name']> = {
  heart: 'heart',
  star: 'star',
  circle: 'circle',
  triangle: 'play',   // "play" simula il triangolo
  bolt: 'bolt',
  hand: 'hand-paper',
};

// Solo il triangolo ha bisogno di rotazione (per puntare in alto)
const rotationMap: Partial<Record<ShapeType, number>> = {
  triangle: 270,
};

const Shape: React.FC<ShapeProps> = ({ type, mirror = false }) => {
  // Crea l'array delle trasformazioni (rotazione + specchiatura se serve)
  const transforms = [];
  if (rotationMap[type]) {
    transforms.push({ rotate: `${rotationMap[type]}deg` });
  }
  if (mirror) {
    transforms.push({ scaleX: -1 });
  }

  return (
    <View style={styles.shape}>
      <FontAwesome5
        name={iconMap[type]}
        size={120}
                color={mirror ? '#e9446a' : '#00c2ff'}
        solid
        style={[styles.icon, transforms.length ? { transform: transforms } : undefined]}
      />
    </View>
  );
};

export default Shape;

const styles = StyleSheet.create({
  shape: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
  },
  icon: {
    shadowColor: '#222',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
});

