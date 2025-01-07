import CastList from "@/src/components/CastList";
import GenreTags from "@/src/components/GenreTags";
import { MovieHeader } from "@/src/components/MovieHeader";
import { StarRating } from "@/src/components/StarRating";
import { ErrorMessage } from "@/src/components/ui/ErrorMessage";
import { Loader } from "@/src/components/ui/Loader";
import { fetchMovieDetailsById, rateMovie } from "@/src/services/movies";
import { Movie, CastMember } from "@/src/types/movies";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView, Text, StyleSheet, Alert } from "react-native";

export default function MovieDetailsScreen() {
    const { id } = useLocalSearchParams();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setLoading(true);
                const data = await fetchMovieDetailsById(Number(id));
                setMovie(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                  } else {
                    setError('An unexpected error occurred.');
                  }
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
            Alert.alert('Success', `You rated the movie with ${value} stars.`);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred.');
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            {loading && <Loader/>}

            {error && <ErrorMessage error={error} />}

            {!loading && !error && movie && (
                <>
                    <MovieHeader movie={movie} />
                    <StarRating rating={rating} onRate={handleRating} />
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
});


