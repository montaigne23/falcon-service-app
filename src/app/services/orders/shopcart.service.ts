import { Injectable } from '@angular/core';
import { OrderItem, OrderTax, Billing, Shipping } from './orders.interface';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {
  shopcart:OrderItem[];
  storeshopcart:any

  constructor() {
    this.storeshopcart = this.getCookie("shopcart");
    this.orderItems = this.storeshopcart ? JSON.parse(this.storeshopcart) : [];

  }

  shipping: Shipping
  billing: Billing;
  orderTax: OrderTax;

  orderItems: OrderItem[] = [];
 updateCookie(cookieName: any, newData: any) {
  const json = JSON.stringify(newData);
    const existingCookie = this.getCookie(cookieName);
    if (existingCookie) {

      const updatedCookie = `${cookieName}=${json}`;
      document.cookie = updatedCookie;
    } else {
      this.setCookieShopCart(newData,"shopcart");
    }
  }

   getCookie(cookieName:any) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        return cookie.substring(`${cookieName}=`.length, cookie.length);
      }
    }
    return null; // Cookie not found
  }

  setCookieShopCart(data: any,shopcart: string | undefined) {
    const json = JSON.stringify(data);
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set the expiration to one year from now
    const expires = "expires=" + d.toUTCString();
    document.cookie = shopcart+"=" + json + "; " + expires + "; path=/";

  }

  remove(product: OrderItem){
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    if (existingIndex !== -1) {
      this.orderItems.splice(existingIndex, 1); // Remove the element at the found index
      this.updateCookie("shopcart",this.orderItems);
    }
  }

  addProduct(product: OrderItem): Promise<void> {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    this.updateCookie("shopcart",this.orderItems);
    if (existingIndex !== -1) {
      console.log(product.product_id);

      let qte = this.orderItems[existingIndex].quantity;
      // Product already exists, update the existing order item
      this.orderItems[existingIndex].quantity = product.quantity + qte;
      this.orderItems[existingIndex].total = (Number(product.total) + Number(this.orderItems[existingIndex].total)).toString();
      this.orderItems[existingIndex].subtotal = (Number(product.subtotal) + Number(this.orderItems[existingIndex].subtotal)).toString();
      this.updateCookie("shopcart",this.orderItems);
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
      this.updateCookie("shopcart",this.orderItems);
    }

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

}
