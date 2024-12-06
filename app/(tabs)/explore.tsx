import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import PokeCard from '@/components/ui/PokeCard';
import { Icon, MD3Colors } from 'react-native-paper';
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={50}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Current Pokemon</ThemedText>
      </ThemedView>
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
    </ParallaxScrollView>
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