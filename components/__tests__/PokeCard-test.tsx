import React from 'react';
import { render } from '@testing-library/react-native';
import PokeCard from '../ui/PokeCard';
import { DetailedPokemon } from '@/utils/interfaces';
import { useWindowDimensions } from 'react-native';

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockPokemonData: DetailedPokemon = {
  name: 'Pikachu',
  weight: 60,
  height: 4,
  types: [{ type: { name: 'Electric' } }],
  sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
};

describe('PokeCard', () => {
  beforeEach(() => {
    require('react-native/Libraries/Utilities/useWindowDimensions').default.mockReturnValue({ width: 360, height: 640 });
  });

  it('renders correctly in portrait mode', () => {
    const { getByText, getByTestId } = render(<PokeCard pokemonData={mockPokemonData} />);

    expect(getByText('Pikachu')).toBeTruthy();
    expect(getByText('Weight:')).toBeTruthy();
    expect(getByText('60')).toBeTruthy();
    expect(getByText('Height:')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('Type:')).toBeTruthy();
    expect(getByText('Electric')).toBeTruthy();
    const image = getByTestId('image');
    expect(image.props.source).toEqual({ uri: mockPokemonData.sprites.front_default });
  });

  it('renders correctly in landscape mode', () => {
    require('react-native/Libraries/Utilities/useWindowDimensions').default.mockReturnValue({ width: 640, height: 360 });
    const { getByText, getByTestId } = render(<PokeCard pokemonData={mockPokemonData} />);

    expect(getByText('Pikachu')).toBeTruthy();
    expect(getByText('Weight:')).toBeTruthy();
    expect(getByText('60')).toBeTruthy();
    expect(getByText('Height:')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('Type:')).toBeTruthy();
    expect(getByText('Electric')).toBeTruthy();
    const image = getByTestId('image');
    expect(image.props.source).toEqual({ uri: mockPokemonData.sprites.front_default });
  });
});
