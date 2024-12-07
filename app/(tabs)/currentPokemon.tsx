import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import PokeCard from '@/components/ui/PokeCard';
import { Icon, MD3Colors, Title } from 'react-native-paper';
import { loadSelectedPokemon } from '@/api/asyncStorage';
import { DetailedPokemon } from '@/utils/interfaces';
import { useFocusEffect } from '@react-navigation/native';


export default function TabTwoScreen() {
  const [currentPokemon, setCurrentPokemon] = useState<DetailedPokemon | null>(null);
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
    <View>
      <Title>Current Pokemon</Title>
      {currentPokemon && (
        <PokeCard pokemonData={currentPokemon} />
      )}
      {!currentPokemon && (
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
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});