import React, { useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Text, Modal, Button, Headline, Portal, Avatar } from 'react-native-paper';
import PokeCard from './PokeCard';
import { DetailedPokemon } from '@/utils/interfaces';

interface PokemonListProps {
  pokemonData: DetailedPokemon[];
  setSelectedPokemon: (name: string) => void;
  selectedPokemon: DetailedPokemon | null;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonData,
  setSelectedPokemon,
  selectedPokemon,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = useWindowDimensions(); 
  const isLandscape = width > height;

  const handlePress = (pokemonName: string): void => {
    setSelectedPokemon(pokemonName);
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { padding: isLandscape ? 10 : 20 }]}>
      <Headline children={undefined} style={[styles.title, { fontSize: isLandscape ? 20 : 24 }]}>
        Pokemon List
      </Headline>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, { padding: isLandscape ? 4 : 8 }]}
            onPress={() => handlePress(item.name)}
          >
            <Avatar.Image size={isLandscape ? 40 : 50} source={{ uri: item.sprites.front_default }} />
            <Text children={undefined} style={[styles.itemText, { marginLeft: 10, fontSize: isLandscape ? 14 : 18 }]}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
      {selectedPokemon && (
        <Portal children={undefined}>
          <Modal
            children={undefined}
            visible={modalVisible}
            onDismiss={closeModal}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <PokeCard pokemonData={selectedPokemon} />
              <View style={styles.buttonContainer}>
                <Button onPress={closeModal} children={undefined} mode='contained'>Close</Button>
              </View>
            </View>
          </Modal>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row', alignItems: 'center',
  },
  itemText: {
    paddingLeft: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default PokemonList;
