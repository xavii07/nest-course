/*export class Pokemon {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}*/

import axios from "axios";
import {
  Move,
  PokeapiResponse,
} from "../interfaces/pokeapi-response.interface";

export class Pokemon {
  get imgUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
  }

  constructor(public readonly id: number, public name: string) {}

  screan() {
    console.log(`Hola soy ${this.name} y mi id es ${this.id}`);
  }

  speak() {
    console.log(`${this.name} dice: Hola!`);
  }

  async getMoves(): Promise<Move[]> {
    const res = await axios.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    return res.data.moves;
  }
}

export const charmander = new Pokemon(2, "Charmander");
charmander.screan();
charmander.speak();
console.log(charmander.imgUrl);
