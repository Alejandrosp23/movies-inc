import { fetchNowPlayingMovies, fetchMovieDetailsById, rateMovie } from '@/src/services/movies';
import apiClient from '@/src/config/api';

jest.mock('@/src/config/api');

describe('Movie API Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNowPlayingMovies', () => {
    it('should fetch and return sorted movies', async () => {
      const mockMovies = [
        { id: 1, title: 'Z Movie', poster_path: '/z.jpg', release_date: '2024-01-01' },
        { id: 2, title: 'A Movie', poster_path: '/a.jpg', release_date: '2024-02-01' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockMovies },
      });

      const movies = await fetchNowPlayingMovies();
      expect(apiClient.get).toHaveBeenCalledWith('/movie/now_playing', {
        params: { language: 'en-US', page: 1 },
      });
      expect(movies[0].title).toBe('A Movie'); // Sorted by title
    });

    it('should throw an error when API fails', async () => {
      (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchNowPlayingMovies()).rejects.toThrow('Failed to fetch now playing movies.');
    });
  });

  describe('fetchMovieDetailsById', () => {
    it('should fetch and return movie details with cast', async () => {
      const mockMovie = {
        id: 1,
        title: 'Test Movie',
        credits: {
          cast: [
            { id: 1, name: 'Actor 1', profile_path: '/actor1.jpg', character: 'Character 1', order: 1 },
            { id: 2, name: 'Actor 2', profile_path: '/actor2.jpg', character: 'Character 2', order: 2 },
          ],
        },
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockMovie });

      const movie = await fetchMovieDetailsById(1);
      expect(apiClient.get).toHaveBeenCalledWith('/movie/1', {
        params: { language: 'en-US', append_to_response: 'credits' },
      });
      expect(movie.title).toBe('Test Movie');
      expect(movie.cast.length).toBe(2);
      expect(movie.cast[0].name).toBe('Actor 1');
    });

    it('should throw an error when API fails', async () => {
      (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchMovieDetailsById(1)).rejects.toThrow('Failed to fetch movie details.');
    });
  });

  describe('rateMovie', () => {
    it('should post the rating and return the response', async () => {
      const mockResponse = { success: true, status_code: 1 };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      const response = await rateMovie(1, 5);
      expect(apiClient.post).toHaveBeenCalledWith('/movie/1/rating', { value: 5 });
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error when API fails', async () => {
      (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      await expect(rateMovie(1, 5)).rejects.toThrow('Failed to submit your rating.');
    });
  });
});