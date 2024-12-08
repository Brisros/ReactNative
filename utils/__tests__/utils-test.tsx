import { pokeFilter } from '../utils';
import { DetailedPokemon } from '@/utils/interfaces';

describe('pokeFilter', () => {
    it('should filter pokemons based on search query', () => {
        const mockPokemons: DetailedPokemon[] = [
            { name: 'Bulbasaur', weight: 69, height: 7, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' } },
            { name: 'Ivysaur', weight: 130, height: 10, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' } },
            { name: 'Charmander', weight: 85, height: 6, types: [{ type: { name: 'fire' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/4.png' } },
        ];

        const searchQuery = 'saur';
        const filteredPokemons = pokeFilter(mockPokemons, searchQuery);

        expect(filteredPokemons.length).toBe(2);
        expect(filteredPokemons).toEqual([
            { name: 'Bulbasaur', weight: 69, height: 7, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' } },
            { name: 'Ivysaur', weight: 130, height: 10, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' } },
        ]);
    });

    it('should return an empty array if no pokemons match the search query', () => {
        const mockPokemons: DetailedPokemon[] = [
            { name: 'Bulbasaur', weight: 69, height: 7, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' } },
            { name: 'Ivysaur', weight: 130, height: 10, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' } },
            { name: 'Charmander', weight: 85, height: 6, types: [{ type: { name: 'fire' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/4.png' } },
        ];

        const searchQuery = 'pikachu';
        const filteredPokemons = pokeFilter(mockPokemons, searchQuery);

        expect(filteredPokemons.length).toBe(0);
        expect(filteredPokemons).toEqual([]);
    });

    it('should return all pokemons if search query is empty', () => {
        const mockPokemons: DetailedPokemon[] = [
            { name: 'Bulbasaur', weight: 69, height: 7, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' } },
            { name: 'Ivysaur', weight: 130, height: 10, types: [{ type: { name: 'grass' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' } },
            { name: 'Charmander', weight: 85, height: 6, types: [{ type: { name: 'fire' } }], sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/4.png' } },
        ];

        const searchQuery = '';
        const filteredPokemons = pokeFilter(mockPokemons, searchQuery);

        expect(filteredPokemons.length).toBe(mockPokemons.length);
        expect(filteredPokemons).toEqual(mockPokemons);
    });
});
