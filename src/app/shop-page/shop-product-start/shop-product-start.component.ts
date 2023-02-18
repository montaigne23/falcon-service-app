import { Component } from '@angular/core';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-shop-product-start',
  templateUrl: './shop-product-start.component.html',
  styleUrls: ['./shop-product-start.component.scss']
})
export class ShopProductStartComponent {
constructor(public _TestserviceService : TestserviceService){

}
}
