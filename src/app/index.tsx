import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchNowPlayingMovies } from '@/src/services/movies';
import { Movie } from '@/src/types/movies';
import { MovieList } from '../components/MovieList';
import { Loader } from '../components/ui/Loader';
import { ErrorMessage } from '../components/ui/ErrorMessage';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await fetchNowPlayingMovies();
        setMovies(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }finally {
        setLoading(false);
    }
  }
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing 🎬</Text>

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading && !error && movies.length === 0 && (
        <Text style={styles.emptyText}>No movies available right now.</Text> 
      )}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
