export const pokemonIds = [1, 20, 5, 54, 6];

export interface Pokemon {
  id: number;
  name: string;
}

export const pokemon1: Pokemon = {
  id: 1,
  name: "Bullbasor",
};

const pokemons: Pokemon[] = [];
pokemons.push(pokemon1);
