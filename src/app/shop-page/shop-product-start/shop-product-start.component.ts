import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductOrder, ProductOrderBy, ProductQuery, RetrieveProductsResponse } from 'src/app/services/products/product.interface';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { ShopServiceService } from 'src/app/services/shop-service.service';
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
  slug: string | null;

  productQuery: ProductQuery = {
    page: 1,
    per_page: 13,
    search:"",
    order: this.productOrder,
    category:""
  }
  constructor(public _TestserviceService: TestserviceService,
    private wooProducs: WoocommerceProductsService,
    private router: Router,
    private route: ActivatedRoute,
    public shopServiceService:ShopServiceService,
  ) {


  }

  ngOnInit():void {
    this.shopServiceService.getProduct(this.route.snapshot.paramMap.get('category')||"")
  }

  navigateToCategory(id: any, tagname: any){
    this.router.navigate(
      ['/shop',id, tagname])
      this.shopServiceService.getProduct(this.route.snapshot.paramMap.get('category')||"")
  }
}
