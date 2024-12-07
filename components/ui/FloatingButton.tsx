import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

interface IFloatingButton {
    onClicked: () => void;
}

const FloatingButton: React.FC<IFloatingButton> = ({ onClicked }) => {
    const [isExtended, setIsExtended] = React.useState(true);

    const handlePress = () => {
        onClicked();
    };

    return (
        <View style={styles.container}>
            <Pressable>
                <AnimatedFAB
                    icon="reload"
                    label=""
                    extended={isExtended}
                    style={styles.fab}
                    animateFrom={'right'}
                    iconMode={'dynamic'}
                    onPress={handlePress}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: -10,
        left:0
    },
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default FloatingButton;
