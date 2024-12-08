import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import PokeCard from '@/components/ui/PokeCard';
import { Appbar, Icon, MD3Colors, Title } from 'react-native-paper';
import { loadSelectedPokemon } from '@/api/asyncStorage';
import { DetailedPokemon } from '@/utils/interfaces';
import { useFocusEffect } from '@react-navigation/native';


export default function TabTwoScreen() {
  const [currentPokemon, setCurrentPokemon] = useState<DetailedPokemon | null>(null);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  useFocusEffect(
    useCallback(() => {
      const fetchPokemon = async () => {
        const pokemon = await loadSelectedPokemon();
        if (pokemon) {
          setCurrentPokemon(pokemon);
        }
      };

      fetchPokemon();
    }, [])
  );

  return (
    <View style={[styles.container, { padding: isLandscape ? 10 : 20 }]}>
      <Appbar.Header>
        <Appbar.Content title="Current Pokemon" />
      </Appbar.Header>
      <View style={styles.content}>
        {currentPokemon ? (
          <PokeCard pokemonData={currentPokemon} />
        ) : (
          <View>
            <Icon
              source="alert"
              color={MD3Colors.error50}
              size={20}
            />
            <Text >No selected pokemon</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    flex: 0.1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    pointerEvents: 'none'
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