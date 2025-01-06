import { Movie } from '@/src/types/movies';
import apiClient from '@/src/config/api';

const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
    const response = await apiClient.get('/movie/now_playing', {
        params: { language: 'en-US', page: 1 },
    });

    const sortedMovies = response.data.results.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));
    
    return sortedMovies;
}

export { fetchNowPlayingMovies };