import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/services/categories/product-categories.interface';
import { CategoryQuery } from 'src/app/services/categories/product-categories.interface';
import { WoocommerceCategoriesService } from 'src/app/services/categories/woocommerce-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  productscategorie: ProductCategory[]
  numbers: number[] = [1, 2, 3,];
  loadingcategorie:boolean = true;

  categoryQuery : CategoryQuery = {
   parent:0
  }
  constructor( private woocategorie: WoocommerceCategoriesService){
  }
  ngOnInit() {
    this.woocategorie.retrieveCategories(this.categoryQuery).subscribe(response => {
      this.productscategorie = response;
      this.loadingcategorie = false
      console.log(response);
    }, err => {
      console.log(err);
    })
  }
}
