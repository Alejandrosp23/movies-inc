import React from "react";
import { Movie } from "../types/movies";
import { StyleSheet, View, Image, Text } from 'react-native';

export function MovieHeader({ movie }: { movie: Movie}) {
    return (
      <>
        <View style={styles.header}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>
              {movie.release_date.split('-')[0]} • ⭐ {movie.vote_average}/10
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: '#333',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    poster: {
      width: 120,
      height: 180,
      borderRadius: 10,
    },
    headerInfo: {
      marginLeft: 20,
      justifyContent: 'center',
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#bbb',
    },
    section: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    overview: {
      fontSize: 16,
      color: '#666',
      lineHeight: 22,
    },
  });
  