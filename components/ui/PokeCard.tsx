import { View, StyleSheet, Text } from 'react-native';
import { DetailedPokemon } from '@/utils/interfaces';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface PokeCardData {
  pokemonData: DetailedPokemon;
}

const PokeCard: React.FC<PokeCardData> = ({ pokemonData }) => {

  return (
    <View style={styles.container}>
      <Card style={styles.card} children={undefined}>
        <Card.Title
          title={pokemonData.name}
          titleStyle={[styles.title, { fontSize: wp('5%') }]}
        />
        <Card.Cover
          source={{ uri: pokemonData.sprites.front_default }}
          style={[styles.image, { width: wp('50%'), height: hp('20%') }]}
        />
        <Card.Content children={undefined}>
          <Paragraph children={undefined}>
            <Text style={styles.labelText}>{'Weight: '}</Text>
            <Text>{pokemonData.weight}</Text>
          </Paragraph>
          <Paragraph children={undefined}>
            <Text style={styles.labelText}>{'Height: '}</Text>
            <Text>{pokemonData.height}</Text>
          </Paragraph>
          <Paragraph children={undefined}>
            <Text style={styles.labelText}>{'Type: '}</Text>
            <Text>{pokemonData.types[0].type.name}</Text>
          </Paragraph>
        </Card.Content>
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
    padding: wp('5%'),
  },
  card: {
    top: hp('2%'),
    width: wp('80%'),
  },
  title: {
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  labelText: {
    fontWeight: 'bold',
  },
});
