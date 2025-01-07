import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Movie } from '@/src/types/movies';

export function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/movie/${item.id}`)}
          style={styles.card}
        >
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieInfo}>Release: {item.release_date}</Text>
            <Text style={styles.movieInfo}>Rating: ⭐ {item.vote_average.toFixed(1)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16, 
    padding: 15,
    marginBottom: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden', 
  },
  poster: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  infoContainer: {
    marginTop: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 14,
    color: '#ddd',
  },
});
