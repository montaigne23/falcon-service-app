import { Component,OnInit, Input } from '@angular/core';
import { TestserviceService } from '../services/testservice.service';
import { CategoryQuery, ProductCategory } from '../services/categories/product-categories.interface';
import { WoocommerceCategoriesService } from '../services/categories/woocommerce-categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Input() inputexemple: any

  productscategorie: ProductCategory[]
  categoryQuery : CategoryQuery = {
    parent:0
   //search:"38"
  }
  constructor(public _TestserviceService :TestserviceService ,
    private woocategorie: WoocommerceCategoriesService){
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
