import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption: any[] = [];

  constructor(private http: HttpClient) { }

  getPokemons(offset?: number, limit?: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getAllPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);
  }

  getMoreData(name: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
