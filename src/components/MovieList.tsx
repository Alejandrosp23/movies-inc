import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { router, useRouter } from 'expo-router';
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
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieInfo}>Release: {item.release_date}</Text>
              <Text style={styles.movieInfo}>Rating: ⭐ {item.vote_average}</Text>
            </TouchableOpacity>
          )}
        />
      );
    }
    
    const styles = StyleSheet.create({
      row: {
        justifyContent: 'space-between',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        width: '47%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      poster: {
        width: '100%',
        height: 200,
        borderRadius: 8,
      },
      movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
      },
      movieInfo: {
        fontSize: 14,
        color: '#666',
      },
    });
    

