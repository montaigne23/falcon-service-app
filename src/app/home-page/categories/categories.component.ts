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
  categoryQuery : CategoryQuery = {
   // parent:38
   search:"38"
  }
  constructor( private woocategorie: WoocommerceCategoriesService){
  }
  ngOnInit() {
    this.woocategorie.retrieveCategories(this.categoryQuery).subscribe(response => {
      this.productscategorie = response;
      console.log(response);
    }, err => {
      console.log(err);
    })
  }
}
