import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';
  products1:any
  products = [
    { name: 'Produit 1', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 2', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 3', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 4', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 5', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 6', image: 'https://via.placeholder.com/50' },
    { name: 'Produit 7', image: 'https://via.placeholder.com/50' }
  ];


  get searchResults() {
    return this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  
  onSearchInput() {
    console.log(this.searchTerm);
    
   this.products1 = this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    // this.products = [
    //   { name: 'Produit 1Produit 1Produit 1Produit 1', image: 'https://via.placeholder.com/50' },
    //   { name: 'Produit 2', image: 'https://via.placeholder.com/50' },
    //   { name: 'Produit 3', image: 'https://via.placeholder.com/50' },
    //   { name: 'Produit 4', image: 'https://via.placeholder.com/50' },
    // ];
    // Call your search API here with searchTerm
    // Replace the following line with your actual API call
    // this.searchResults = [
    //   `${this.searchTerm} Result 1`,
    //   `${this.searchTerm} Result 2`,
    //   `${this.searchTerm} Result 3`
    // ];
  }

  isInputFocused: boolean = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }
}
