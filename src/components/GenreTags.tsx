import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Genre } from '../types/movies';

interface GenreTagsProps {
  genres: Genre[];
}

export default function GenreTags({ genres }: GenreTagsProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {genres.map((genre) => (
          <View key={genre.id} style={styles.tag}>
            <Text style={styles.tagText}>{genre.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingLeft: 20,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
