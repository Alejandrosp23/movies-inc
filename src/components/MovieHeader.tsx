import React from "react";
import { Movie } from "../types/movies";
import { StyleSheet, View, Image, Text } from 'react-native';
import GenreTags from "./GenreTags";

export function MovieHeader({ movie }: { movie: Movie}) {
    return (
      <>
        <View style={styles.header}>
          {/* Movie Poster */}
          {movie.poster_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.poster}
            />
          ) : (
            <View style={styles.posterPlaceholder}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}

          {/* Movie Info */}
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movie.title || "Untitled"}</Text>
            
            <Text style={styles.subtitle}>
              {movie.release_date ? movie.release_date.split("-")[0] : "Unknown Year"} • ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10 ({movie.vote_count || 0} votes)
            </Text>
          </View>
        </View>
          <GenreTags genres={movie.genres} />
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Overview</Text> */}
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      padding: 20,
      backgroundColor: "#333",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    poster: {
      width: 120,
      height: 180,
      borderRadius: 10,
    },
    posterPlaceholder: {
      width: 120,
      height: 180,
      borderRadius: 10,
      backgroundColor: "#555",
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: {
      color: "#ccc",
      fontSize: 14,
    },
    headerInfo: {
      marginLeft: 20,
      justifyContent: "center",
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#bbb",
    },
    section: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    overview: {
      fontSize: 16,
      color: '#666',
      lineHeight: 22,
    },
  });
  