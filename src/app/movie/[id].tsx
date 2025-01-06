import CastList from "@/src/components/CastList";
import GenreTags from "@/src/components/GenreTags";
import { MovieHeader } from "@/src/components/MovieHeader";
import { StarRating } from "@/src/components/StarRating";
import { fetchMovieDetailsById, rateMovie } from "@/src/services/movies";
import { Movie, CastMember } from "@/src/types/movies";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, Text, StyleSheet } from "react-native";

export default function MovieDetailsScreen() {
    const { id } = useLocalSearchParams();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setLoading(true);
                const data = await fetchMovieDetailsById(Number(id));
                setMovie(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    }, [id]);

    const filterTop10CastMembers = (castMembers: CastMember[]) => {
        const filteredCast = castMembers
            .sort((a, b) => a.order - b.order)
            .slice(0, 10);
        return filteredCast;
    }

    const handleRating = async (value: number) => {
        setRating(value);
        try {
            await rateMovie(Number(id), value);
            alert(`You rated movie ${id} with a ${value} star rating.`);

            const updatedMovie = await fetchMovieDetailsById(Number(id));
            setMovie(updatedMovie);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#007BFF" />}

            {error && <Text style={styles.errorText}>{error.message}</Text>}

            {!loading && !error && movie && (
                <>
                    <MovieHeader movie={movie} />
                    <StarRating rating={rating} onRate={handleRating} />
                    <GenreTags genres={movie.genres} />
                    <CastList cast={filterTop10CastMembers(movie.cast)} />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});


