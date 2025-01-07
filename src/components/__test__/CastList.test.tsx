import React from 'react';
import { render } from '@testing-library/react-native';
import CastList from '@/src/components/CastList';

const mockCast = [
  {
    id: 1,
    name: 'Dwayne Johnson',
    profile_path: '/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
    character: 'Callum Drift',
    order: 0,
  },
  {
    id: 2,
    name: 'Emily Blunt',
    profile_path: "", // No image available
    character: 'Dr. Lily Houghton',
    order: 1,
  },
];

describe('CastList Component', () => {
  it('renders a list of cast members', () => {
    const { getByText, getByTestId } = render(<CastList cast={mockCast} />);


    expect(getByText('Dwayne Johnson')).toBeTruthy();
    expect(getByText('Callum Drift')).toBeTruthy();
    expect(getByText('Emily Blunt')).toBeTruthy();
    expect(getByText('Dr. Lily Houghton')).toBeTruthy();

    expect(getByTestId('cast-image-1')).toHaveProp(
      'source',
      expect.objectContaining({
        uri: 'https://image.tmdb.org/t/p/w500/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
      })
    );

    expect(getByTestId('cast-image-2')).toHaveProp(
      'source',
      expect.objectContaining({
        uri: 'https://via.placeholder.com/150',
      })
    );
  });
});
