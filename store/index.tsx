import { fetchPokemonsDataList } from '@/api/pokemonApi';
import { DetailedPokemon } from '@/utils/interfaces';
import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPomenons',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchPokemonsDataList(page);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

  export const failedAPI = createAsyncThunk(
  'pokemon/failedAPI',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = rejectWithValue('Fake API error');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loadingData = true;
        state.hasError = false;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loadingData = false;
        state.pokemonData = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loadingData = false;
        state.hasError = true;
      })
      .addCase(failedAPI.rejected, (state, action) => {
        state.loadingData = false;
        state.hasError = true;
      })
  }
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
