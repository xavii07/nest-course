import axios from "axios";

export interface httpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeapiAdapter implements httpAdapter {
  private readonly axios = axios;

  //TODO: Generico T
  async get<T>(url: string): Promise<T> {
    const res = await this.axios.get<T>(url);
    return res.data;
  }
}

export class PokeapiFetchAdapter implements httpAdapter {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}
