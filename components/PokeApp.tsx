import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, AppDispatch, RootState, setSelectedPokemon, incrementPage, setLoadingData, setHasError } from '../store';
import { View, ScrollView, Text, ActivityIndicator, useWindowDimensions, StyleSheet } from 'react-native';
import PokemonList from '@/components/ui/PokemonList';
import SearchBox from '@/components/ui/SearchBox';
import { Button } from '@rneui/base';
import ModalError from '@/components/ui/ModalError';
import { DetailedPokemon } from '@/utils/interfaces';
import { saveSelectedPokemon } from '../api/asyncStorage';
import FloatingButton from './ui/FloatingButton';

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

    useEffect(() => {
        dispatch(fetchPokemons(page));
    }, [dispatch, page]);

    const filteredPokemon: DetailedPokemon[] = pokemonData.filter((pokemon: DetailedPokemon) =>
        pokemon?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            setSelectedPokemon={setSelectedPokemons}
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
            <View style={styles.floatingButton}>
                <FloatingButton onClicked={reloadApi} />
            </View>
        </View>
    );
};

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
    floatingButton: { position: 'absolute', right: 20, bottom: 10, },
});

export default PokeApp;
