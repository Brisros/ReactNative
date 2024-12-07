import {
  DetailedPokemon,
  Pokemon,
  PokemonsApiResult,
  PokemonsDataApiResult,
} from '@/utils/interfaces';
import apiClient from './apiClient';
const calculateNextElements = (pag: number) => {
  return pag * 20;
};

export const fetchPokemonsList = async (
  limit: number = 20,
  page: number = 0,
): Promise<Pokemon[]> => {
  try {
    const response: PokemonsApiResult = await apiClient.get(
      `?limit=${limit}&offset=${calculateNextElements(page)}`,
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonData = async (
  pokemonId: string,
): Promise<DetailedPokemon> => {
  try {
    const response: PokemonsDataApiResult = await apiClient.get(`${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonsDataList = async (
  page: number,
): Promise<DetailedPokemon[]> => {
  try {
    const initialData: Pokemon[] = await fetchPokemonsList(20, page);
    console.log('Chito!!! ', initialData)

    const detailedDataPromises: Promise<DetailedPokemon>[] = initialData.map(
      (pokemon: Pokemon) => fetchPokemonData(pokemon.url),
    );

    const detailedDataResponse: DetailedPokemon[] =
      await Promise.all(detailedDataPromises);
    return detailedDataResponse || [];
  } catch (error) {
    console.log('Error en la Data list: ', error);
    throw error;
  }
};
