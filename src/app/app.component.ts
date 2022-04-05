import { Item } from './models/item';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Formulario | DAW2';
  items: Item[] = [];
  columnsToDisplay = ['itemId', 'itemName', 'itemActionEdit', 'itemActionDelete'];
  selectedItem: Item = {
    id: -1,
    name: "",
  };
  isNewPokemon: boolean = false;
  lastItemId: number = 1;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPokemonData().subscribe((res) => {
      this.items = res.results.map((x, index) => {
        let item: Item = {id: index+1, name: x.name};
        this.lastItemId = index+1;
        return item;
      })
    })
  }

  deleteItem(itemSearched: Item) {
    this.items = this.items.filter(item => item != itemSearched);
  }

  setSelectedItem(item: Item, isNewPokemon: boolean) {
    this.selectedItem.id = item.id
    this.selectedItem.name = item.name
    this.isNewPokemon = isNewPokemon
  }

  unsetSelectedItem() {
    this.selectedItem = {
      id: -1,
      name: "",
    }
    this.isNewPokemon = false;
  }

  saveSelectedItem() {
    if (this.isNewPokemon) {
      // por como funciona mat-table, aquí hay que hacer una implementación rara del añadido de objetos.
      let newItems = Array.of(...this.items)
      newItems.push(this.selectedItem);
      this.items = newItems;
      this.unsetSelectedItem();
      return;
    }
    this.items.forEach(item => {
      if (item.id === this.selectedItem.id) {
        item.name = this.selectedItem.name;
        return;
      }
    });
    this.unsetSelectedItem();
  }
}
