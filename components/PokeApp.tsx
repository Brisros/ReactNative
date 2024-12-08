import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, AppDispatch, RootState, setSelectedPokemon, incrementPage, failedAPI } from '../store';
import { View, ActivityIndicator, useWindowDimensions, StyleSheet, ScrollView, Pressable } from 'react-native';
import PokemonList from '@/components/ui/PokemonList';
import SearchBox from '@/components/ui/SearchBox';
import ModalError from '@/components/ui/ModalError';
import { DetailedPokemon } from '@/utils/interfaces';
import { saveSelectedPokemon } from '../api/asyncStorage';
import FloatingButton from './ui/FloatingButton';
import { pokeFilter } from '@/utils/utils';
import { Appbar, Button, Text } from 'react-native-paper';

const PokeApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pokemonData = useSelector((state: RootState) => state.pokemon.pokemonData);
    const selectedPokemon: DetailedPokemon | null = useSelector((state: RootState) => state.pokemon.selectedPokemon);
    const page: number = useSelector((state: RootState) => state.pokemon.page);
    const hasError: boolean = useSelector((state: RootState) => state.pokemon.hasError);
    const loading: boolean = useSelector((state: RootState) => state.pokemon.loadingData);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const [searchQuery, setSearchQuery] = useState('');
    const [viewSearchBar, setViewSearchBar] = useState(false);

    useEffect(() => {
        dispatch(fetchPokemons(page));
    }, [dispatch, page]);

    const filteredPokemon: DetailedPokemon[] = pokeFilter(pokemonData, searchQuery.toLowerCase());

    const setSelectedPokemons = async (name: string): Promise<void> => {
        const selected = pokemonData.find(pokemon => pokemon?.name === name);
        await saveSelectedPokemon(selected as DetailedPokemon);
        dispatch(setSelectedPokemon(selected));
    }

    const nextPage = (): void => {
        dispatch(incrementPage());
    };

    const reloadApi = (): void => {
        dispatch(fetchPokemons(0));
    }

    const fakeFailedAPI = (): void => {
        dispatch(failedAPI(0));
    }

    return (
        <View style={[styles.container, { padding: isLandscape ? 10 : 20 }]}>
            <Appbar.Header>
                <Appbar.Content title="Poke App" />
                <Appbar.Action icon="magnify" onPress={() => setViewSearchBar(!viewSearchBar)} />
            </Appbar.Header>
            {viewSearchBar && (
                <View style={styles.searchContainer}>
                    <SearchBox searchText={searchQuery} setSearchText={setSearchQuery} />
                </View>
            )}
            <View style={styles.content}>
                {loading ? (
                    <View style={styles.content}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View style={styles.content}>
                        <PokemonList
                            pokemonData={filteredPokemon}
                            selectedPokemon={selectedPokemon}
                            setSelectedPokemon={setSelectedPokemons}
                        />
                        {filteredPokemon.length === 20 && (
                            <View style={styles.paginationButtons}>
                                <Button mode="outlined" onPress={nextPage}>Next Page</Button>
                            </View>
                        )}
                    </View>
                )}
            </View>
            {hasError && (
                <View>
                    <ModalError />
                </View>
            )}
            <View>
                <FloatingButton onClicked={reloadApi} position='right' type='reload' />
                <FloatingButton onClicked={fakeFailedAPI} position='left' type='fail' />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 0.1,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
        pointerEvents: 'none',
        backgroundColor: 'red'
    },
    searchContainer: {
        padding: 10
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    content: {
        flex: 1
    },
});

export default PokeApp;
