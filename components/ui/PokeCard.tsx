import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { DetailedPokemon } from '@/utils/interfaces';

interface PokeCardData {
  pokemonData: DetailedPokemon;
}

const PokeCard: React.FC<PokeCardData> = ({ pokemonData }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { padding: width < 375 ? 10 : 20 }]}>
      <Card>
        <Card.Title style={[styles.title, { fontSize: width < 375 ? 18 : 24 }]}>
          {pokemonData.name}
        </Card.Title>
        <Card.Divider />
        <Card.Image
          style={[
            styles.image,
            { width: width < 375 ? 100 : 150, height: width < 375 ? 100 : 150 },
          ]}
          source={{
            uri: pokemonData.sprites.front_default,
          }}
        />
        <Card.Divider />
        <Card.FeaturedSubtitle style={styles.subtitle}>
          <Text style={styles.labelText}>{'Weight: '}</Text>
          <Text>{pokemonData.weight}</Text>
        </Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle style={styles.subtitle}>
          <Text style={styles.labelText}>{'Height: '}</Text>
          <Text>{pokemonData.height}</Text>
        </Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle style={styles.subtitle}>
          <Text style={styles.labelText}>{'Type: '}</Text>
          <Text>{pokemonData.types[0].type.name}</Text>
        </Card.FeaturedSubtitle>
      </Card>
    </View>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  image: {
    padding: 0,
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  labelText: {
    fontWeight: 'bold',
  },
});
