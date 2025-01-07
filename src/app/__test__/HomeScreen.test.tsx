import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../index';
import { fetchNowPlayingMovies } from '@/src/services/movies';

jest.mock('@/src/services/movies', () => ({
  fetchNowPlayingMovies: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'Ionicons',
}));

const mockMovies = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    release_date: '2001-12-19',
    vote_average: 8.8,
    poster_path: '/poster1.jpg',
    overview: 'An epic fantasy adventure.',
    genres: [],
    cast: [],
  },
  {
    id: 2,
    title: 'Harry Potter and the Sorcerer\'s Stone',
    release_date: '2001-11-16',
    vote_average: 7.9,
    poster_path: '/poster2.jpg',
    overview: 'The magical adventure begins.',
    genres: [],
    cast: [],
  },
];

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loader while fetching movies', () => {
    (fetchNowPlayingMovies as jest.Mock).mockResolvedValueOnce([]);

    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders the list of movies after fetching successfully', async () => {
    (fetchNowPlayingMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('The Lord of the Rings')).toBeTruthy();
      expect(getByText('Harry Potter and the Sorcerer\'s Stone')).toBeTruthy();
    });
  });

  it('renders an error message if the API call fails', async () => {
    (fetchNowPlayingMovies as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch movies.'));

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Failed to fetch movies.')).toBeTruthy();
    });
  });

  it('renders a message when no movies are available', async () => {
    (fetchNowPlayingMovies as jest.Mock).mockResolvedValueOnce([]);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('No movies available right now.')).toBeTruthy();
    });
  });
});
