import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieList } from '@/src/components/MovieList';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

const mockMovies = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    release_date: '2001-12-19',
    vote_average: 8.8,
    vote_count: 1200,
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
    vote_count: 1100,
    poster_path: '/poster2.jpg',
    overview: 'The magical adventure begins.',
    genres: [],
    cast: [],
  },
];

describe('MovieList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of movies', () => {
    const { getByText } = render(<MovieList movies={mockMovies} />);

    expect(getByText('The Lord of the Rings')).toBeTruthy();
    expect(getByText('Harry Potter and the Sorcerer\'s Stone')).toBeTruthy();

    expect(getByText('Release: 2001-12-19')).toBeTruthy();
    expect(getByText('Release: 2001-11-16')).toBeTruthy();

    expect(getByText('Rating: ⭐ 8.8')).toBeTruthy();
    expect(getByText('Rating: ⭐ 7.9')).toBeTruthy();
  });

  it('navigates to movie details screen when a movie is pressed', () => {
    const { getByText } = render(<MovieList movies={mockMovies} />);

    fireEvent.press(getByText('The Lord of the Rings'));

    expect(router.push).toHaveBeenCalledWith('/movie/1');
  });
});
