import apiClient from './apiClient';

export const fetchPokemonsList = async (limit: number = 20) => {
  try {
    const response = await apiClient.get(`?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonData = async (pokemonId: string) => {
  try {
    const response = await apiClient.get(`${pokemonId}`);
    // console.log('pokemonId: ', pokemonId);
    // console.log('data: ', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const fetchPokemonsDataList = async () => {
  try {
    const initialData = await fetchPokemonsList();
    const detailedDataPromises = initialData.map((pokemon: any)=> fetchPokemonData(pokemon.url));
    const detailedDataResponse = await Promise.all(detailedDataPromises);

    console.log('ALL DATA: ', detailedDataResponse);
    return detailedDataResponse || [];

  }catch(error){
    console.log('Error en la Data list: ', error);
  }
}
