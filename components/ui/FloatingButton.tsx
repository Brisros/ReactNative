import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

interface IFloatingButton {
    onClicked: () => void;
    position: 'left' | 'right';
    type: 'reload' | 'fail';
}

const FloatingButton: React.FC<IFloatingButton> = ({ onClicked, position, type }) => {
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
                    style={
                        [
                            styles.fab,
                            position === 'left' ? styles.left : styles.right,
                            type === 'reload' ? styles.reload : styles.fail
                        ]}
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
        backgroundColor: 'red'
    },
    fab: {
        bottom: 0,
        backgroundColor: 'orange',
    },
    left:
    {
        left: 0,
    },
    right: {
        right: 0
    },
    reload: {
        backgroundColor: 'orange'
    },
    fail: {
        backgroundColor: 'red'
    }
});

export default FloatingButton;
