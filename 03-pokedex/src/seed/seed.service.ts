import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); //delete * from pokemons

    const { data } = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=5`,
    );

    //?const insertPromiseArray = [];
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      //await this.pokemonModel.create({ name, no });
      //?insertPromiseArray.push(this.pokemonModel.create({ name, no }));
      pokemonToInsert.push({ name, no });
    });

    //?await Promise.all(insertPromiseArray);
    await this.pokemonModel.insertMany(pokemonToInsert); //insert into pokemons (name, no) values
    // ('bulbasaur', 1), ('ivysaur', 2), ('venusaur', 3), ('charmander', 4), ('charmeleon', 5);

    return 'Seed executed';
  }
}
