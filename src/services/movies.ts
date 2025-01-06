import { Movie, CastMember } from '@/src/types/movies';
import apiClient from '@/src/config/api';

const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
    const response = await apiClient.get('/movie/now_playing', {
        params: { language: 'en-US', page: 1 },
    });

    const sortedMovies = response.data.results.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));
    
    return sortedMovies;
}

const fetchMovieDetailsById = async (id: number): Promise<Movie> => {
    const response = await apiClient.get(`/movie/${id}`, {
        params: { language: 'en-US', append_to_response: 'credits' },
    });

    const movie = response.data;

    const cast = movie.credits.cast.map((castMember: CastMember) => ({
        id: castMember.id,
        name: castMember.name,
        profile_path: castMember.profile_path,
        character: castMember.character,
        order: castMember.order,
    }));

    return {...movie, cast};
}


export { fetchNowPlayingMovies, fetchMovieDetailsById };