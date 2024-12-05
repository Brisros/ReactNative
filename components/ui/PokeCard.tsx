import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

interface PokeCardData {
    pokemonData: any[];
}

const PokeCard: React.FC<PokeCardData> = ({ pokemonData }) => {
    return (
        <View>

            <Card>
                <Card.Title>{pokemonData.name}</Card.Title>
                <Card.Divider />
                <Card.Image
                    style={{ padding: 0 }}
                    source={{
                        uri: pokemonData.sprites.front_default,
                    }}
                />
                <Card.Divider />
                <Card.FeaturedSubtitle>
                    <Text style={styles.labelText}>
                        Weight:
                    </Text>
                    <Text>{
                        pokemonData.weight}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.FeaturedSubtitle>
                    <Text style={styles.labelText}>
                        {'Height: '}
                    </Text>
                    <Text>
                        {pokemonData.height}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.FeaturedSubtitle>
                    <Text style={styles.labelText}>
                        {'Type: '}
                    </Text>
                    <Text>
                        {pokemonData.types[0].type.name}
                    </Text>
                </Card.FeaturedSubtitle>
            </Card>
        </View>
    );
};

export default PokeCard;

const styles = StyleSheet.create({
    labelText: {
        fontWeight: 'bold',
    }
})