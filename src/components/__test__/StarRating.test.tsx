import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StarRating } from '@/src/components/StarRating';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => 'Ionicons',
}));

describe('StarRating Component', () => {
  it('renders the correct number of stars', () => {
    const { getAllByTestId } = render(<StarRating rating={3} onRate={() => {}} />);
    
    // Assert that there are 5 star icons rendered
    const stars = getAllByTestId(/star-icon-/);
    expect(stars.length).toBe(5);
  });

  it('renders the correct filled stars based on rating', () => {
    const { getByTestId } = render(<StarRating rating={3} onRate={() => {}} />);

    // Assert that the first 3 stars are filled
    expect(getByTestId('star-icon-1')).toBeTruthy();
    expect(getByTestId('star-icon-2')).toBeTruthy();
    expect(getByTestId('star-icon-3')).toBeTruthy();

    // Assert that the remaining stars are outlined
    expect(getByTestId('star-icon-4')).toBeTruthy();
    expect(getByTestId('star-icon-5')).toBeTruthy();
  });

  it('calls onRate with the correct value when a star is pressed', () => {
    const onRateMock = jest.fn();
    const { getByTestId } = render(<StarRating rating={0} onRate={onRateMock} />);

    // Simulate pressing the 4th star
    const fourthStar = getByTestId('star-icon-4');
    fireEvent.press(fourthStar);

    // Assert that the onRate function was called with the correct value
    expect(onRateMock).toHaveBeenCalledWith(4);
  });

  it('displays the correct user rating text', () => {
    const { getByText } = render(<StarRating rating={4} onRate={() => {}} />);

    // Assert that the correct rating text is displayed
    expect(getByText('You rated: 4/5')).toBeTruthy();
  });
});
