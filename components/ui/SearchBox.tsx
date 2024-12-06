import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

interface SearchBoxText {
  searchText: string;
  setSearchText: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxText> = ({ searchText, setSearchText }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        label='Search Pokemon'
        value={searchText}
        onChangeText={setSearchText}
        style={[styles.input, { fontSize: width < 375 ? 14 : 18 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
});

export default SearchBox;
