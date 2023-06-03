import { Component, OnInit } from '@angular/core';
import { Product, ProductOrder, ProductOrderBy, ProductQuery, RetrieveProductsResponse } from 'src/app/services/products/product.interface';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { TestserviceService } from 'src/app/services/testservice.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {
  retrieveProductsResponse: RetrieveProductsResponse
  products?: Product[] = [];
  currentPage?: number = 1;
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  loadingProduct: boolean = true;
  productOrder: ProductOrder = ProductOrder.desc

  productQuery: ProductQuery = {
    in_stock:true,
    page: 1,
    per_page: 9,
    order: this.productOrder,
    category: ""
  }
  constructor(public _TestserviceService: TestserviceService,
    private wooProducs: WoocommerceProductsService,
  ) { }

  ngOnInit() {
    this.currentPage = 1
    this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      this.products = this.retrieveProductsResponse.products
      //console.log(this.products);
      
      this.loadingProduct = false;
    }, err => {
      console.log(err);
    });
  }

}
