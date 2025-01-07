import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  rating: number;
  onRate: (value: number) => void;
};

export function StarRating({ rating, onRate }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.ratingLabel}>Rate this movie</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onRate(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={36}
              color="#FFD700"
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.userRating}>You rated: {rating}/5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 5,
  },
  userRating: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
