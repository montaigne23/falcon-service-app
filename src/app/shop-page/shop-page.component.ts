import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from '../services/shop-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  activecategory : string
constructor(
  public shopServiceService:ShopServiceService,
  private route: ActivatedRoute,
  private router: Router,

  ){
    this.activecategory  = this.shopServiceService.activeCategory
  }
  ngOnInit(){

}
navigateToCategory(){
  this.router.navigate(
    ['/shop'])
    this.shopServiceService.getProduct(this.route.snapshot.paramMap.get('category')||"")
}
}
