import { DetailedPokemon } from '@/utils/interfaces';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  pokemonData: DetailedPokemon[];
  selectedPokemon: DetailedPokemon | null;
  page: number;
  loadingData: boolean;
  hasError: boolean;
}

const initialState: PokemonState = {
  pokemonData: [],
  selectedPokemon: null,
  page: 0,
  loadingData: false,
  hasError: false,
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
    incrementPage(state) {
      state.page += 1;
    },
    setLoadingData(state, action: PayloadAction<boolean>) {
      state.loadingData = action.payload;
    },
    setHasError(state, action: PayloadAction<boolean>) {
      state.hasError = action.payload;
    },
  },
});

export const {
  setPokemonData,
  setSelectedPokemon,
  incrementPage,
  setLoadingData,
  setHasError,
} = pokemonSlice.actions;

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
