import { Component, Input } from '@angular/core';
import { OrderItem } from 'src/app/services/orders/orders.interface';
import { ShopcartService } from 'src/app/services/orders/shopcart.service';
import { Product } from 'src/app/services/products/product.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {
  @Input() item: Product;

  orderItem: OrderItem = {
    name: "",
    product_id: 0,
    quantity: 1,
    subtotal: '',
    subtotal_tax: '',
    total: '',
    total_tax: '',
    taxes: [],
    meta_data: [],
    price: "",
    sku: ''
  };
constructor(public shopcartService:ShopcartService){
}
  convertNumber(e: string | undefined) {
    return Number(e);
  }
  async addtocard(product:Product) {
    this.orderItem.name = product.name;
    this.orderItem.product_id = product.id;
    this.orderItem.price = product.sale_price;

    this.orderItem.total = (1* Number(this.orderItem.price)).toString()
    this.orderItem.subtotal = (this.orderItem.quantity* Number(this.orderItem.price)).toString()
   await this.shopcartService.addProduct(this.orderItem).then((value)=>{
    //  console.log(this.shopcartService.orderItems);
   });
  }
}
