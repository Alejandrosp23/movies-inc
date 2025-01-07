import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { CastMember } from '../types/movies';

interface CastListProps {
  cast: CastMember[];
}

export default function CastList({ cast }: CastListProps) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Starring</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast.map((member) => (
          <View key={member.id} style={styles.castItem}>
            <Image
              source={{ uri: member.profile_path
                ? `https://image.tmdb.org/t/p/w500${member.profile_path}` 
                : 'https://via.placeholder.com/150' }}
              testID={`cast-image-${member.id}`}
              style={styles.castImage}
            />
            <Text style={styles.castName}>{member.name}</Text>
            <Text style={styles.castCharacter}>{member.character}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  castItem: {
    marginRight: 10,
    alignItems: 'center',
    width: 90,
  },
  castImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 5,
  },
  castName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

