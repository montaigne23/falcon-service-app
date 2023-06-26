import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  public data:any = 0
  @Input() inputexemple= 100

ngOnInit(){
  this.data = this.inputexemple;
}

  images=[
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-8.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-7.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-6.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-5.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-4.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-3.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-2.jpg",
    "alt":"",
    'title': ""
  },
    {
    "src":"https://www.falconservicemanage.online/wp-content/uploads/2023/04/vendor-1-1.jpg",
    "alt":"",
    'title': ""
  },
]
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
        items: 6
      }
    },
    nav: false
  }

}
