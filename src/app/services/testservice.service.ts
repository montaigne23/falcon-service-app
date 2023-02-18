import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class TestserviceService {

  public data: any = [
    {
      "id": 1,
      "tagname":"product_name_goes_here_1",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-1.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },{
      "id": 2,
      "tagname":"product_name_goes_here_2",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-2.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4.5,
      "comment":99
    },{
      "id": 3,
      "tagname":"product_name_goes_here_3",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-3.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 3,
      "comment":99
    },{
      "id": 4,
      "tagname":"product_name_goes_here_4",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-4.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 5,
      "comment":99
    },{
      "id": 5,
      "tagname":"product_name_goes_here_5",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-5.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },{
      "id": 6,
      "tagname":"product_name_goes_here_6",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-6.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },{
      "id": 7,
      "tagname":"product_name_goes_here_7",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-7.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },{
      "id": 8,
      "tagname":"product_name_goes_here_8",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-8.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },{
      "id": 9,
      "tagname":"product_name_goes_here_9",
      "name":"Product Name Goes Here",
      "image": "assets/image/product-9.jpg",
      "last_p": 5000,
      "new_p": 4000,
      "rating": 4,
      "comment":99
    },
  ]

  constructor() { }

  public totalData: number = 0;
  public totalData1: number = 1;

}
