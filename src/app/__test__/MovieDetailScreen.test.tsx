import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import MovieDetailsScreen from '../movie/[id]';
import { fetchMovieDetailsById, rateMovie } from '@/src/services/movies';
import { Alert } from 'react-native';

jest.mock('@/src/services/movies', () => ({
  fetchMovieDetailsById: jest.fn(),
  rateMovie: jest.fn(),
}));

jest.mock('expo-router/build/hooks', () => ({
  useLocalSearchParams: () => ({ id: '1' }),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'Ionicons',
}));

jest.spyOn(Alert, 'alert');

const mockMovie = {
  id: 1,
  title: 'The Lord of the Rings',
  release_date: '2001-12-19',
  vote_average: 8.8,
  poster_path: '/poster1.jpg',
  overview: 'An epic fantasy adventure.',
  genres: [{ id: 1, name: 'Action' }],
  cast: [
    {
      id: 1,
      name: 'Elijah Wood',
      profile_path: '/elijah.jpg',
      character: 'Frodo Baggins',
      order: 1,
    },
    {
      id: 2,
      name: 'Ian McKellen',
      profile_path: '/ian.jpg',
      character: 'Gandalf',
      order: 2,
    },
  ],
};

describe('MovieDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the loader while fetching movie details', () => {
    (fetchMovieDetailsById as jest.Mock).mockResolvedValueOnce(mockMovie);

    const { getByTestId } = render(<MovieDetailsScreen />);

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('displays movie details after fetching successfully', async () => {
    (fetchMovieDetailsById as jest.Mock).mockResolvedValueOnce(mockMovie);

    const { getByText } = render(<MovieDetailsScreen />);

    await waitFor(() => {
      expect(getByText('The Lord of the Rings')).toBeTruthy();
      expect(getByText('Frodo Baggins')).toBeTruthy();
      expect(getByText('Gandalf')).toBeTruthy();
    });
  });

  it('renders an error message if the API call fails', async () => {
    (fetchMovieDetailsById as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch movie details.'));

    const { getByText } = render(<MovieDetailsScreen />);

    await waitFor(() => {
      expect(getByText('Failed to fetch movie details.')).toBeTruthy();
    });
  });

  it('handles rating submission and shows success alert', async () => {
    (fetchMovieDetailsById as jest.Mock).mockResolvedValueOnce(mockMovie);
    (rateMovie as jest.Mock).mockResolvedValueOnce({});

    const { getByText, getAllByTestId } = render(<MovieDetailsScreen />);

    await waitFor(() => getByText('The Lord of the Rings'));
    expect(getByText('The Lord of the Rings')).toBeTruthy();

    const fourthStar = getAllByTestId('star-icon')[3];
    fireEvent.press(fourthStar);

    expect(rateMovie).toHaveBeenCalledWith(1, 4);

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'You rated the movie with 4 stars.');
  });

  it('handles rating submission error and shows error alert', async () => {
    (fetchMovieDetailsById as jest.Mock).mockResolvedValueOnce(mockMovie);
    (rateMovie as jest.Mock).mockRejectedValueOnce(new Error('Failed to submit your rating.'));

    const { getByText, getAllByTestId } = render(<MovieDetailsScreen />);

    await waitFor(() => getByText('The Lord of the Rings'));
    expect(getByText('The Lord of the Rings')).toBeTruthy();

    const fourthStar = getAllByTestId('star-icon')[3];
    fireEvent.press(fourthStar);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to submit your rating.');
  });
});
