import { Injectable } from '@angular/core';
import { WoocommerceProductsService } from './products/woocommerce-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductOrder, ProductQuery, RetrieveProductsResponse } from './products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  retrieveProductsResponse: RetrieveProductsResponse
  public products?: Product[] = [];
  public totalPage?: number = 0;
  public totalcount?: number = 0;
  public currentPage?: number = 1;
  public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public loadingProduct: boolean = true;
  public productOrder: ProductOrder = ProductOrder.desc
  // public slug: string | null;

  productQuery: ProductQuery = {
    page: 1,
    per_page: 15,
    search:"",
    order: this.productOrder,
    category: ""
  }
  constructor(
    private wooProducs: WoocommerceProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  public activeCategory: string = ""

  public getProduct(slug:string) {

    const param1 = this.route.snapshot.queryParamMap.get('search');
    // console.log("ok");
    param1!=null?  this.productQuery.search = param1:"";

    // slug = this.route.snapshot.paramMap.get('category')||"";
    //console.log(slug);
    this.loadingProduct = true;
    this.productQuery.category = slug || ""
    this.currentPage = 1
    this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      this.products = this.retrieveProductsResponse.products
      // this.products? this.products[0].categories ? this.shopServiceService.activeCategory = this.products[0].categories[0].name : null : null
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
