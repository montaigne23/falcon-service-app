import { Component } from '@angular/core';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent {

  constructor(public _TestserviceService : TestserviceService){

  }
}
