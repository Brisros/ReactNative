import apiClient from '../apiClient';
import { PokemonsApiResult, PokemonsDataApiResult } from '@/utils/interfaces';
import { fetchPokemonsList, fetchPokemonData } from '../pokemonApi';

jest.mock('../apiClient');

describe('API Client', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches a list of Pokémon', async () => {
        const mockResponse: PokemonsApiResult = {
            data: {
                results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
            },
        };
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);
        const result = await fetchPokemonsList(20, 0);
        expect(apiClient.get).toHaveBeenCalledWith('?limit=20&offset=0');
        expect(result).toEqual(mockResponse.data.results);
    });

    it('fetches detailed data for a Pokémon', async () => {
        const mockResponse: PokemonsDataApiResult = {
            data: {
                name: 'bulbasaur',
                weight: 69,
                height: 7,
                types: [{ type: { name: 'grass' } }],
                sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' },
            },
        };
        (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);
        const result = await fetchPokemonData('1');
        expect(apiClient.get).toHaveBeenCalledWith('1');
        expect(result).toEqual(mockResponse.data);
    });
});
