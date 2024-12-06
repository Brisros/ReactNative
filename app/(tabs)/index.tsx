import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { setPokemonData, AppDispatch, RootState, setSelectedPokemon, incrementPage, setLoadingData, setHasError } from '../../store';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { fetchPokemonsDataList } from '../../api/pokemonApi';
import PokemonList from '@/components/ui/PokemonList';
import SearchBox from '@/components/ui/SearchBox';
import { Button } from '@rneui/base';
import ModalError from '@/components/ui/ModalError';
import { DetailedPokemon } from '@/utils/interfaces';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector((state: RootState) => state.pokemon.pokemonData);
  const selectedPokemon: DetailedPokemon | null = useSelector((state: RootState) => state.pokemon.selectedPokemon);
  const page: number = useSelector((state: RootState) => state.pokemon.page);
  const hasError: boolean = useSelector((state: RootState) => state.pokemon.hasError);
  const loading: boolean = useSelector((state: RootState) => state.pokemon.loadingData);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPokemons = async (): Promise<void> => {
      try {
        dispatch(setLoadingData(true))
        const data = await fetchPokemonsDataList(page) || [];
        dispatch(setPokemonData(data));
        dispatch(setLoadingData(false));
      } catch (error) {
        dispatch(setHasError(true))
        console.log('error error ', error);
      }
    };

    loadPokemons();
  }, [dispatch, page]);

  const filteredPokemon: DetailedPokemon[] = pokemonData.filter((pokemon: DetailedPokemon) =>
    pokemon?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextPage = (): void => {
    dispatch(incrementPage());
  };

  return (
    <View style={[styles.container, { padding: isLandscape ? 10 : 20 }]}>
      <ScrollView>
        <SearchBox searchText={searchQuery} setSearchText={setSearchQuery} />
        {loading && (
          <ActivityIndicator size="large" />
        )}
        {!loading && (
          <View>
            <PokemonList
              pokemonData={filteredPokemon}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={(name: string) => {
                const selected = pokemonData.find(pokemon => pokemon?.name === name);
                dispatch(setSelectedPokemon(selected));
              }}
            />
            {filteredPokemon.length === 20 && (
              <View style={styles.paginationButtons}>
                <Button title='Next Page' onPress={nextPage} />
              </View>
            )}
          </View>

        )}
        {hasError && (
          <View>
            <Text>there was an error {hasError}</Text>
            <ModalError />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const App: React.FC = () => (
  <Provider store={store} children={undefined}>
    <PaperProvider theme={DefaultTheme} children={undefined}>
      <AppContent />
    </PaperProvider>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default App;