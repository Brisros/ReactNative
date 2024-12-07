export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface DetailedPokemon {
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
    types: [
      {
        type: {
          name: string;
        }
      }],
    [key: string]: any;
  }
  
  export interface PokemonsResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }
  
  export interface PokemonsApiResult {
    [key: string]: any;
    data: PokemonsResult;
  }
  
  export interface PokemonsDataApiResult {
    [key: string]: any;
    data: DetailedPokemon;
  }
  