import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBoxText {
    searchText: string;
    setSearchText: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxText> = ({ searchText, setSearchText }) => {


    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="search for a pokemon"
                keyboardType="default"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default SearchBox;
