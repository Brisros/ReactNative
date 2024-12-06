import { DetailedPokemon } from '@/utils/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_KEY = 'SELECTED_POKEMON';

export const saveSelectedPokemon = async (pokemon: DetailedPokemon) => {
  console.log('This is the last reviewed pokemon: ', pokemon);
  try {
    const jsonValue = JSON.stringify(pokemon);
    await AsyncStorage.setItem(POKEMON_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving selected Pokémon', e);
  }
};

export const loadSelectedPokemon = async (): Promise<DetailedPokemon | null> => {
  let currentPokemon: DetailedPokemon | null;
  try {
    const jsonValue = await AsyncStorage.getItem(POKEMON_KEY);
    currentPokemon = jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error loading selected Pokémon', e);
    currentPokemon = null;
  }
  return currentPokemon;
};