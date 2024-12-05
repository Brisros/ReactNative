import React, { useState } from 'react';
import { View, Text, FlatList, Image, Pressable, Modal, StyleSheet, Button } from 'react-native';

interface PokemonListProps {
  pokemonData: any[];
  setSelectedPokemon: (name: string) => void;
  selectedPokemon: any | undefined;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData, setSelectedPokemon, selectedPokemon }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    // const selected = pokemonData.find((pokemon: any) => pokemon.name === pokemonName);
    console.log('selected: ', pokemonName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View>
      <Text>Pokemon List</Text>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.name)}>
            <Text>{item.name}</Text>
            <Image source={{ uri: item.sprites.front_default }}
              style={{ width: 30, height: 30 }} />
          </Pressable>
        )}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text>Selected Pokemon name:</Text>
            {selectedPokemon &&
              (<Text>Selected Pokemon name: {selectedPokemon.name}</Text>)
            }
            <Button title='Close' onPress={closeModal} />
          </View>

        </View>

      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});


export default PokemonList;
