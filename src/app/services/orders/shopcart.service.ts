import { Injectable } from '@angular/core';
import { OrderItem, OrderTax, Billing, Shipping } from './orders.interface';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  constructor() { }
  shipping: Shipping
  billing: Billing;
  orderTax: OrderTax;

  orderItems: OrderItem[] = [];

  addProduct(product: OrderItem): Promise<void> {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);

    if (existingIndex !== -1) {
      console.log(product.product_id);

      let qte = this.orderItems[existingIndex].quantity;
      // Product already exists, update the existing order item
      this.orderItems[existingIndex].quantity = product.quantity + qte;
      this.orderItems[existingIndex].total = (Number(product.total) + Number(this.orderItems[existingIndex].total)).toString();
      this.orderItems[existingIndex].subtotal = (Number(product.subtotal) + Number(this.orderItems[existingIndex].subtotal)).toString();

    } else {
      let orderItem: OrderItem = {
        name: product.name,
        product_id: product.product_id,
        quantity: product.quantity,
        subtotal: product.subtotal,
        subtotal_tax: '',
        total: product.total,
        total_tax: '',
        taxes: [],
        meta_data: [],
        price: product.price,
        sku: ''
      };
      this.orderItems.push(orderItem);
    }

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

}
