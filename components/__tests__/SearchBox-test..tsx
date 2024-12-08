import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBox from '../ui/SearchBox';
import { PaperProvider } from 'react-native-paper';

describe('SearchBox Component', () => {

    it('should render the component correctly', () => {
        const fn = jest.fn();
        const rendered = render(<SearchBox searchText='test text' setSearchText={fn} />);
        expect(rendered).toBeTruthy();
    });

    it('displays the correct initial value', () => {
        const { getByDisplayValue } = render(
            <PaperProvider>
                <SearchBox searchText="Pikachu" setSearchText={() => { }} />
            </PaperProvider>
        );
        expect(getByDisplayValue('Pikachu')).toBeTruthy();
    });

    it('calls setSearchText on text input change', () => {
        const mockSetSearchText = jest.fn();
        const { getByPlaceholderText } = render(
            <PaperProvider>
                <SearchBox searchText="" setSearchText={mockSetSearchText} />
            </PaperProvider>
        );
        fireEvent.changeText(getByPlaceholderText('Search Pokemon'), 'Charmander');
        expect(mockSetSearchText).toHaveBeenCalledWith('Charmander');
    });
});
