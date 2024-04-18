import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PokeapiService} from "../../services/pokeapi.service";
import {CardModule} from "primeng/card";
import {TitleCasePipe} from "@angular/common";
import {TabViewModule} from "primeng/tabview";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CardModule,
    TitleCasePipe,
    TabViewModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  pokemon: any;

  constructor(
    private pokemonService: PokeapiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.pokemonService.getPokemonById(id);
      })
    ).subscribe(pokemon => {
      this.pokemon = pokemon;
      console.log(this.pokemon)
    });
  }

}
