import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  offer =[
    {
      "save": "20%",
      "image":{
        "src":"assets/image/offer-2.jpg",
        "alt":"",
        'title': ""
      }
    },
    {
      "save": "30%",
      "image":{
        "src":"assets/image/offer-1.jpg",
        "alt":"",
        'title': ""
      }
    },
    {
      "save": "25%",
      "image":{
        "src":"assets/image/offer-2.jpg",
        "alt":"",
        'title': ""
      }
    },
    {
      "save": "15%",
      "image":{
        "src":"assets/image/offer-1.jpg",
        "alt":"",
        'title': ""
      }
    },
]

  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
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
       }
    ,
      740: {
        items: 3
      },
    //   940: {
    //     items: 6
    //   }
     },
    nav: false
  }

}
