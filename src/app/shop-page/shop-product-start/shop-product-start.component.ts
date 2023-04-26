import { Component, OnInit } from '@angular/core';
import { Product, ProductQuery, RetrieveProductsResponse } from 'src/app/services/products/product.interface';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-shop-product-start',
  templateUrl: './shop-product-start.component.html',
  styleUrls: ['./shop-product-start.component.scss']
})
export class ShopProductStartComponent implements OnInit{
retrieveProductsResponse : RetrieveProductsResponse
products?: Product[];
totalPage?: number =0;
totalcount?: number = 0;
productQuery:ProductQuery= {
  per_page:9
}
constructor(public _TestserviceService : TestserviceService,
    private wooProducs: WoocommerceProductsService,
){} 

ngOnInit(){
this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
this.retrieveProductsResponse = response
this.products = this.retrieveProductsResponse.products
if (response.headers) {
  this.totalPage = Number(response.headers["x-wp-totalpages"])
  this.totalcount = Number(response.headers["x-wp-total"])
  console.log(this.totalPage);
  console.log(this.totalcount);
} else {
  console.log('La propriété "headers" ou l\'en-tête "x-wp-totalpages" n\'est pas définie.');
}
}, err => {
  console.log(err);
});
}
}
