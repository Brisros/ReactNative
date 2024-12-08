import apiClient from '../apiClient';
import { PokemonsApiResult, PokemonsDataApiResult } from '@/utils/interfaces';
import { fetchPokemonsList, fetchPokemonData } from '../pokemonApi';

jest.mock('../apiClient');

describe('API Client', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches a list of Pokemon', async () => {
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

    it('fetches detailed data for a Pokemon', async () => {
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

    describe('Error Handling', () => {
        it('should log an error and throw when the API call fails', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('API error'));
            await expect(fetchPokemonsList(20, 0)).rejects.toThrow('API error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching Pokemon list:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
        it('should log an error and throw when the API call fails', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('API error'));
            await expect(fetchPokemonData('1')).rejects.toThrow('API error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching Pokemon list:', expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
    });
});
