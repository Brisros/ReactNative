import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  pokemonData: any[];
  selectedPokemon: any | null;
}

const initialState: PokemonState = {
  pokemonData: [],
  selectedPokemon: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonData(state, action: PayloadAction<any[]>) {
      state.pokemonData = action.payload;
    },
    setSelectedPokemon(state, action: PayloadAction<any | null>) {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setPokemonData, setSelectedPokemon } = pokemonSlice.actions;

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
