import { Injectable } from '@angular/core';
import { OrderItem, OrderTax, Billing, Shipping } from './orders.interface';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {
  shopcart: OrderItem[];
  storeshopcart: any

  constructor() {
    this.getCookie("shopcart");
  }


  shipping: Shipping
  billing: Billing;
  orderTax: OrderTax;
  subtotal:number=0;
  total:number=0;
  shipping_amount:number=0;

  orderItems: OrderItem[] = [];
  updateCookie(cookieName: any, newData: any) {
    const json = JSON.stringify(newData);
    const existingCookie = this.getCookie(cookieName);
    if (existingCookie) {

      const updatedCookie = `${cookieName}=${json}`;
      document.cookie = updatedCookie;
    } else {
      this.setCookieShopCart(newData, "shopcart");
    }
  }

  getCookie(Name: any) {
    const store = localStorage.getItem(Name);
    if (store) {
      this.orderItems = store ? JSON.parse(store) : [];
    }
    return null; // Cookie not found
  }

  setCookieShopCart(data: any, shopcart: string | undefined) {
    const json = JSON.stringify(data);
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set the expiration to one year from now
    const expires = "expires=" + d.toUTCString();
    document.cookie = shopcart + "=" + json + "; " + expires + "; path=/";

  }
  calculSummary(){
    this.subtotal = 0;
    this.total = 0;
    this.shipping_amount = 0;
    for (let index = 0; index < this.orderItems.length; index++) {
      const element = this.orderItems[index];
      this.subtotal = this.subtotal + Number(element.subtotal);
    }
    this.total = this.subtotal;
  }
clearAll(){
  this.orderItems=[];
  localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
this.calculSummary();
}
  setQuantity(q:any,product: OrderItem){
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    if (existingIndex !== -1) {
    //  console.log(Number(q?.target?.value));

      this.orderItems[existingIndex].quantity = Number(q.target!.value);
      this.orderItems[existingIndex].total = (Number(q.target!.value) * Number(product.price))?.toString();
      this.orderItems[existingIndex].subtotal = (Number(q.target!.value) * Number(product.price))?.toString();
      this.calculSummary()
      localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
    }
  }
  plus(product: OrderItem) {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    if (existingIndex !== -1) {
      this.orderItems[existingIndex].quantity += 1

      this.orderItems[existingIndex].total = (this.orderItems[existingIndex].quantity  * Number(product.price))?.toString();
      this.orderItems[existingIndex].subtotal = (this.orderItems[existingIndex].quantity  * Number(product.price))?.toString();
      this.calculSummary()
      localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
    }
  }
  minus(product: OrderItem) {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    if (this.orderItems[existingIndex].quantity > 1) {
      if (existingIndex !== -1) {
        this.orderItems[existingIndex].quantity -= 1

        this.orderItems[existingIndex].total = (this.orderItems[existingIndex].quantity  * Number(product.price))?.toString();
        this.orderItems[existingIndex].subtotal = (this.orderItems[existingIndex].quantity  * Number(product.price))?.toString();
      this.calculSummary()
        localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
      }
      }
  }
  remove(product: OrderItem) {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    if (existingIndex !== -1) {
      this.orderItems.splice(existingIndex, 1); // Remove the element at the found index
      this.calculSummary();
      localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
    }
  }

  addProduct(product: OrderItem): Promise<void> {
    let existingIndex = 999999
    existingIndex = this.orderItems.findIndex(item => item.product_id === product.product_id);
    localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
    if (existingIndex !== -1) {
      let qte = this.orderItems[existingIndex].quantity;
      // Product already exists, update the existing order item
      this.orderItems[existingIndex].quantity = product.quantity + qte;
      this.orderItems[existingIndex].total = (Number(product.total) + Number(this.orderItems[existingIndex].total)).toString();
      this.orderItems[existingIndex].subtotal = (Number(product.subtotal) + Number(this.orderItems[existingIndex].subtotal)).toString();
      this.calculSummary()

      localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
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
      this.calculSummary()
      localStorage.setItem("shopcart", JSON.stringify(this.orderItems));
    }

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

}
