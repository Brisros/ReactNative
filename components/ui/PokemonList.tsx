import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  Button,
  useWindowDimensions,
} from 'react-native';
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
  const { width } = useWindowDimensions();

  const handlePress = (pokemonName: string): void => {
    setSelectedPokemon(pokemonName);
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: width < 375 ? 18 : 24 }]}>
        Pokemon List
      </Text>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, { padding: width < 375 ? 8 : 16 }]}
            onPress={() => handlePress(item.name)}
          >
            <Text
              style={[styles.itemText, { fontSize: width < 375 ? 14 : 18 }]}
            >
              {item.name}
            </Text>
            <Image
              source={{ uri: item.sprites.front_default }}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        )}
      />
      {selectedPokemon && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <PokeCard pokemonData={selectedPokemon} />
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    backgroundColor: 'lightgrey',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PokemonList;
