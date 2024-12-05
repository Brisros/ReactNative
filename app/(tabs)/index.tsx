import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { setPokemonData, AppDispatch, RootState, setSelectedPokemon } from '../../store';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { fetchPokemonsDataList } from '../../api/pokemonApi';
import PokemonList from '@/components/ui/PokemonList';
import SearchBox from '@/components/ui/SearchBox';



const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector((state: RootState) => state.pokemon.pokemonData);
  const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        // const data = await fetchPokemonsList();
        const data = await fetchPokemonsDataList() || [];
        dispatch(setPokemonData(data));
      } catch (error) {
        console.error(error);
      }
    };

    loadPokemons();
  }, [dispatch]);

  const filteredPokemon = pokemonData.filter((pokemon: any) =>
    pokemon?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBox searchText={searchQuery} setSearchText={setSearchQuery} />
        <PokemonList
          pokemonData={filteredPokemon}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={(name: string) => {
            const selected = pokemonData.find(pokemon => pokemon?.name === name);
            dispatch(setSelectedPokemon(selected));
          }}
        />
                {selectedPokemon && (
          <View>
            <Text>Selected Pokémon:</Text>
            <Text>Name: {selectedPokemon?.name}</Text>
            <Text>Height: {selectedPokemon.height}</Text>
            <Text>Weight: {selectedPokemon.weight}</Text>
            {/* Añade más detalles según necesites */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default App;