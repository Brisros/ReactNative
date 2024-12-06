import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { DetailedPokemon } from '@/utils/interfaces';
import { Card } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface PokeCardData {
  pokemonData: DetailedPokemon;
}

const PokeCard: React.FC<PokeCardData> = ({ pokemonData }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={isLandscape ? styles.containerLandscape : styles.containerPortrait}>
      <Card style={styles.card}>
        <Card.Title
          title={pokemonData.name}
          titleStyle={styles.title}
        />
        <Card.Cover
          source={{ uri: pokemonData.sprites.front_default }}
          style={styles.image}
        />
        <Card.Content>
          <View style={styles.textRow}>
            <Text style={styles.labelText}>Weight: </Text>
            <Text>{pokemonData.weight}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.labelText}>Height: </Text>
            <Text>{pokemonData.height}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.labelText}>Type: </Text>
            <Text>{pokemonData.types[0].type.name}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  containerLandscape: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('3%'),
  },
  card: {
    width: wp('75%'),
  },
  title: {
    textAlign: 'center',
    fontSize: wp('4%'),
  },
  image: {
    alignSelf: 'center',
    width: wp('40%'),
    height: hp('15%'),
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelText: {
    fontWeight: 'bold',
  },
});
