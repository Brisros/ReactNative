import React from 'react';
import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';

interface SearchBoxText {
  searchText: string;
  setSearchText: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxText> = ({ searchText, setSearchText }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { fontSize: width < 375 ? 14 : 18 }]}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="search for a pokemon"
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchBox;
