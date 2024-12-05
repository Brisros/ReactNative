import React from 'react';
import { View } from 'react-native';
import PokemonList from '../components/ui/PokemonList';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <PokemonList />
    </View>
  );
};

export default HomeScreen;
