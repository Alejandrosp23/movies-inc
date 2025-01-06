import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Genre } from '../types/movies';

interface GenreTagsProps {
  genres: Genre[];
}

export default function GenreTags({ genres }: GenreTagsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {genres.map((genre) => (
        <View key={genre.id} style={styles.tag}>
          <Text style={styles.tagText}>{genre.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
});
