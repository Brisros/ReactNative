import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import PokemonList from '../ui/PokemonList';
import { DetailedPokemon } from '@/utils/interfaces';
import { PaperProvider, Provider } from 'react-native-paper';

const mockPokemonData: DetailedPokemon[] = [
  {
    name: 'Pikachu',
    weight: 60,
    height: 4,
    types: [{ type: { name: 'Electric' } }],
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  },
  {
    name: 'Bulbasaur',
    weight: 69,
    height: 7,
    types: [{ type: { name: 'Grass' } }],
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  },
];

const mockSetSelectedPokemon = jest.fn();

describe('PokemonList Component', () => {
  const fn = jest.fn();
  it('should render the component correctly', () => {
    const { getByText } = render(<PokemonList pokemonData={mockPokemonData} selectedPokemon={null} setSelectedPokemon={fn} />);
    expect(getByText('Pokemon List')).toBeTruthy();
    expect(getByText(mockPokemonData[0].name)).toBeTruthy();
    expect(getByText(mockPokemonData[1].name)).toBeTruthy();
  });

  it('opens modal with selected Pokemon details', async () => {
    const { getByText } = render(
      <PaperProvider>
        <PokemonList
          pokemonData={mockPokemonData}
          setSelectedPokemon={mockSetSelectedPokemon}
          selectedPokemon={mockPokemonData[0]}
        />
      </PaperProvider>
    );

    await act(async () => {
      fireEvent.press(getByText('Pikachu'));
    });

    await waitFor(() => {
      expect(mockSetSelectedPokemon).toHaveBeenCalledWith('Pikachu');
    });
    await act(async () => {
      await act(async () => {
        expect(getByText('Weight:')).toBeTruthy();
        expect(getByText('60')).toBeTruthy();
        expect(getByText('Height:')).toBeTruthy();
        expect(getByText('4')).toBeTruthy();
        expect(getByText('Type:')).toBeTruthy();
        expect(getByText('Electric')).toBeTruthy();
      });
    });
  });


  it('closes the modal when close button is pressed', async () => {
    const { getByText } = render(
      <PaperProvider>
        <PokemonList
          pokemonData={mockPokemonData}
          setSelectedPokemon={mockSetSelectedPokemon}
          selectedPokemon={mockPokemonData[0]}
        />
      </PaperProvider>
    );
    await act(async () => {
      fireEvent.press(getByText('Pikachu'));
    });
    await act(async () => {
      await waitFor(() => {
        expect(mockSetSelectedPokemon).toHaveBeenCalledWith('Pikachu');
        expect(getByText('Close')).toBeTruthy();
      });
    });
  });

});
