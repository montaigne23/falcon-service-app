import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orders/order.service';
import { ShopcartService } from '../services/orders/shopcart.service';
import { OrderItem } from '../services/orders/orders.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shopcart:OrderItem[];
  storeshopcart:any
  constructor(private orderService: OrderService, public ShopcartService:ShopcartService) {
     this.storeshopcart = this.ShopcartService.getCookie("shopcart");
  }

  ngOnInit(): void {
    
  this.orderService.listAllOrder().subscribe((value)=>{
      console.log(value);
    });
    this.shopcart = this.storeshopcart ? JSON.parse(this.storeshopcart) : [];
    console.log(this.shopcart);
  }

}
