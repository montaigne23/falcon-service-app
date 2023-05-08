import { Component, OnInit } from '@angular/core';
import { Product, ProductOrder, ProductOrderBy, ProductQuery, RetrieveProductsResponse } from 'src/app/services/products/product.interface';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {

  retrieveProductsResponse : RetrieveProductsResponse
  products?: Product[] = [];
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  loadingProduct:boolean = true;
  productOrder: ProductOrder = ProductOrder.desc
  
  productQuery:ProductQuery= {
    page: 1,
    per_page: 9,
    order: this.productOrder,
    category: ""
  }
  constructor(public _TestserviceService : TestserviceService,
      private wooProducs: WoocommerceProductsService,
  ){} 

  ngOnInit(){
  this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
  this.retrieveProductsResponse = response
  this.products = this.retrieveProductsResponse.products
  this.products? console.log(this.products[3]?.categories): null;
  this.loadingProduct = false;
  }, err => { 
    console.log(err);
  });
  }
  
}
