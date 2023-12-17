import {
  Move,
  PokeapiResponse,
} from "../interfaces/pokeapi-response.interface";
import {
  PokeapiAdapter,
  PokeapiFetchAdapter,
  httpAdapter,
} from "../api/pokeApi.adapter";

export class Pokemon {
  get imgUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    //TODO: Inyeccion de dependencias
    private readonly http: httpAdapter
  ) {}

  screan() {
    console.log(`Hola soy ${this.name} y mi id es ${this.id}`);
  }

  speak() {
    console.log(`${this.name} dice: Hola!`);
  }

  async getMoves(): Promise<Move[]> {
    const res = await this.http.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    return res.moves;
  }
}
const pokeApiAxios = new PokeapiAdapter();
const pokeApiFetch = new PokeapiFetchAdapter();
export const charmander = new Pokemon(2, "Charmander", pokeApiAxios);
charmander.screan();
charmander.speak();
console.log(charmander.imgUrl);
