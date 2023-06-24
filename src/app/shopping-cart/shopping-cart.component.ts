import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orders/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
  this.orderService.listAllOrder().subscribe((value)=>{
      console.log(value);
    });
    
  }
}
