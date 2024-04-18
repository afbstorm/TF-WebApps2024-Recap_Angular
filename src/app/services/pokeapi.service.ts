import { Injectable } from '@angular/core';
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=151`).pipe(
      switchMap((response: any) => {
        // Collect an array of observables for details requests
        const detailsRequests = response.results.map((pokemon: any) => {
          return this.http.get(pokemon.url);
        });

        // Use forkJoin to wait for all HTTP requests to complete
        return forkJoin(detailsRequests);
      }),
      map((detailsArray: any) => {
        // Transform the details array to include only desired properties
        return detailsArray.map((details: any) => ({
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
        }));
      })
    );
  }

  getPokemonById(id: number): Observable<any> {
    console.log(id)
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
