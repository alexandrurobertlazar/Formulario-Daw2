import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getPokemonData() {
    return this.httpClient.get<{results: Item[]}>('https://pokeapi.co/api/v2/pokemon')
  }
}
