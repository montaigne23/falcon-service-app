import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  constructor() { }
  public activeCategory: string = ""
}
