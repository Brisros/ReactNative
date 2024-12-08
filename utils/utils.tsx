import { DetailedPokemon } from "./interfaces";

export const pokeFilter = (pokemonsData: DetailedPokemon[], searchQuery: string): DetailedPokemon[] => {
    return pokemonsData.filter((pokemon: DetailedPokemon) =>
        pokemon?.name.toLowerCase().includes(searchQuery.toLowerCase()));
}