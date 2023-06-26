import { Component, OnInit,AfterViewInit } from '@angular/core';
import { WoocommerceProductsService } from '../services/products/woocommerce-products.service';
import { Product, ProductOrder, ProductQuery, RetrieveProductsResponse } from '../services/products/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchTerm: string = '';
  products1: any[]
  // products = [
  //   { name: 'Produit 1', image: 'assets/image/camera-1.jpg' },
  //   { name: 'Produit 2', image: 'https://via.placeholder.com/50' },
  //   { name: 'Produit 3', image: 'https://via.placeholder.com/50' },
  //   { name: 'Produit 4', image: 'https://via.placeholder.com/50' },
  //   { name: 'Produit 5', image: 'https://via.placeholder.com/50' },
  //   { name: 'Produit 6', image: 'https://via.placeholder.com/50' },
  //   { name: 'Produit 7', image: 'https://via.placeholder.com/50' }
  // ];
  products?: Product[] = [];
  currentPage?: number = 1;
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  loadingProduct: boolean = true;
  productOrder: ProductOrder = ProductOrder.desc

  productQuery: ProductQuery = {
    in_stock: true,
    page: 1,
    per_page: 4,
    search: "",
    order: this.productOrder,
    category: ""
  }
  retrieveProductsResponse: RetrieveProductsResponse

param:string|null;
    constructor(private wooProducs: WoocommerceProductsService, private router: Router,private route: ActivatedRoute,) {
    // console.log("ok");

  }

  // get searchResults() {
  //   return this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()), );
  // }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.param = this.route.snapshot.queryParamMap.get('search');
  }
  goToShop() { 
    const params = {
      search: this.searchTerm.toLowerCase(),
    };
    this.router.navigate(['/shop'], { queryParams: params });
    setTimeout(()=>{
      window.location.reload();

    },1000)
  }
  onSearchInput(event: Event) {
    // const input = event.target as HTMLInputElement;
    // if (this.searchTerm.trim() === '') {
    //   input.value = ''
    //   this.searchTerm = '';
    // }
    // console.log(this.searchTerm);
    // if ( this.searchTerm.trim() != "") {
    //   this.products1 = this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    // }
    this.productQuery.search = this.searchTerm.toLowerCase();
    this.currentPage = 1
    this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      this.products = this.retrieveProductsResponse.products
      console.log(this.retrieveProductsResponse.products);

      this.loadingProduct = false;
    }, err => {
      console.log(err);
    });
  }




  isInputFocused: boolean = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }
}
