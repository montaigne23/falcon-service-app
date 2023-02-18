import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TestserviceService } from '../services/testservice.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent {
  quantity:number = 1
  constructor(public _TestserviceService : TestserviceService, private router: Router){
    window.scroll(0,0)
  }
  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  addtocard(){
this._TestserviceService.totalData1 +=this.quantity
this.quantity = 1
  }
  plus(){
    this.quantity +=1
  }
  minus(){
    if (this.quantity > 1) { 
      this.quantity -=1
    }
  }
  goProduct(tagname:string) {  
    // console.log(tagname);
    
    window.scroll(0,0)
    this.router.navigate(
        ['/shop', tagname])
       }

}
