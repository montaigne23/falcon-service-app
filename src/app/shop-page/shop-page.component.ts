import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from '../services/shop-service.service';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  activecategory : string 
constructor(
  private shopServiceService:ShopServiceService
  ){
    this.activecategory  = this.shopServiceService.activeCategory
  }
  ngOnInit(){
}
}
