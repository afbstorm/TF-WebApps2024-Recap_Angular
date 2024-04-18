import {Component, OnInit} from '@angular/core';
import {PokeapiService} from "../../services/pokeapi.service";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonService: PokeapiService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe(data => {
      console.log(data)
      this.pokemons = data;
    });
  }

}
