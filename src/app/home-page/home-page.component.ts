import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { WoocommerceProductsService } from '../services/products/woocommerce-products.service';
import { LoginPayload } from '../services/auth/auth.interface';
import { AuthService } from '../services/auth/auth.service';
import { WoocommerceCategoriesService } from '../services/categories/woocommerce-categories.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() outputexemple: EventEmitter<any> = new EventEmitter()
  @Output() outputexemple1: EventEmitter<any> = new EventEmitter()

  public val = 5
  loginPayload: LoginPayload = {
    username: 'john_doe',
    password: 'my_secret_password'
  }; constructor(
    private wooProducs: WoocommerceProductsService,
    private authService: AuthService,
    private woocategorie: WoocommerceCategoriesService
  ) {

  }
  async ngOnInit() {
    this.val = 8
    this.loginPayload.password = "19032001Lf@#";
    this.loginPayload.username = "montaigne";

    // await this.authService.getAuthToken(this.loginPayload).subscribe(response => {
    //   console.log(response);
    // }, err => {
    //   console.log(err);
    // });
    await this.wooProducs.retrieveProducts().subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
    // await this.woocategorie.retrieveCategories().subscribe(response => {
    //   console.log(response)
    // }, err => {
    //   console.log(err);
    // })
  }

  reciveData(val: any) {
    this.val = val
    console.log(val);
    this.outputexemple.emit(this.val)
  }

  sendData() {
  }
}
