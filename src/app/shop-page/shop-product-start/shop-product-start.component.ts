import { Component, OnInit } from '@angular/core';
import { Product, ProductOrder, ProductOrderBy, ProductQuery, RetrieveProductsResponse } from 'src/app/services/products/product.interface';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-shop-product-start',
  templateUrl: './shop-product-start.component.html',
  styleUrls: ['./shop-product-start.component.scss']
})
export class ShopProductStartComponent implements OnInit {
  retrieveProductsResponse: RetrieveProductsResponse
  products?: Product[] = [];
  totalPage?: number = 0;
  totalcount?: number = 0;
  currentPage?: number = 1;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  loadingProduct: boolean = true;
  productOrder: ProductOrder = ProductOrder.desc

  productQuery: ProductQuery = {
    page: 1,
    per_page: 9,
    order: this.productOrder
  }
  constructor(public _TestserviceService: TestserviceService,
    private wooProducs: WoocommerceProductsService,
  ) { }

  ngOnInit() {
    this.currentPage = 1
    this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      this.products = this.retrieveProductsResponse.products
      this.loadingProduct = false;
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

  getMorePage(value: number) {
    this.loadingProduct = true;
    this.productQuery.page = value
    this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      this.products = this.retrieveProductsResponse.products
      this.currentPage = value;
      this.loadingProduct = false;

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
