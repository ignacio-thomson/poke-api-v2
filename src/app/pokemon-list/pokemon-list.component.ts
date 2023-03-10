import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js/auto';

export interface PokemonData {
  name: string,
  id: number,
  type: string,
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonsLetters: any[] = [];
  pokemon: any = "";
  pokemonByName: any = "";
  // Pokemon Alphabet Sorted Map
  sortedMap: any = {};
  // Charts
  chart: any = "";
  chartByName: any = "";
  selectedPokemon: any;
  // Search bar suggestions
  myControl = new FormControl();
  allPokemons: any[] = [];
  // Table, pagination, sort and filter
  filteredOptions: Observable<string[]> | undefined;
  displayedColumns: string[] = ["sprite", "name", "id", "type", "actions"]
  dataSource!: MatTableDataSource<PokemonData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  poke: any;
  pokes: PokemonData[] = [];

  constructor(public dataService: DataService) {
    this.dataService.getAllPokemons().subscribe((data: any) => {
      data.results.forEach((element: any) => {
        this.dataService.getMoreData(element.name).subscribe((data: any) => {
          let filteredData = {
            sprite: '',
            name: '',
            id: 0,
            type: '',
          }
          filteredData.sprite = data.sprites.front_default
          filteredData.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          filteredData.id = data.id;
          filteredData.type = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
          this.poke = filteredData;
          this.pokes.push(this.poke);
          this.dataSource = new MatTableDataSource(this.pokes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.seeMore("bulbasaur");
    this.getPokemonByName("charmander");
    this.getAllPokemons();
    this.dataService.getAllPokemons().subscribe((pokemons: any) => {
      pokemons.results.forEach((element: any) => {
        this.allPokemons.push(element.name);
      });
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => this.filter(val))
    );
    
  }

  filter(val: any): any[] {
  return this.allPokemons.filter((item: any) => {
    if (typeof val === 'object') { val = "" };
    const TempString = item;
    return TempString.toLowerCase().includes(val.toLowerCase());
  });
  }

  AutoCompleteDisplay(item: any): any {
  if (item != undefined) { return item; }
  return undefined;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getAllPokemons(){
    this.dataService.getAllPokemons().subscribe((resp: any) => {
      resp.results.forEach((element: any) => {
        this.pokemonsLetters.push(element.name);
      });
      let letterCount = this.pokemonsLetters.reduce((count: any, word: string) => {
        let firstLetter = word[0];
        count[firstLetter] = (count[firstLetter] || 0) + 1;
        return count;
      }, {});
      let count = new Map(Object.entries(letterCount).map(([k, v]) => [k.toUpperCase(), v]));
      let sortedCount = Array.from(count.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      this.sortedMap = new Map(sortedCount);
    });
  }

  updateChart(chart: Chart){
    if(chart){
      chart.destroy();
    }
    chart.render();
  }

  getPokemonByName(name: string) {
    this.dataService.getPokemonByName(name.toLowerCase()).subscribe((res: any) => {
      this.pokemonByName = res;
    });
  }

  seeMore(name: string) {
    this.dataService.getMoreData(name).subscribe((res: any) => {
      this.pokemon = res;
      this.chart = new Chart("myChart2", {
        type: 'doughnut',
        data: {
          labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
          datasets: [
            {
              label: 'Statistics',
              data: [res.stats[0].base_stat, res.stats[1].base_stat, res.stats[2].base_stat, res.stats[3].base_stat, res.stats[4].base_stat, res.stats[5].base_stat],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
              ],
              borderWidth: 1
            }
          ] 
        },
      });
    });
  }
}
