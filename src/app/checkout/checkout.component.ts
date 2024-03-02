import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopcartService } from '../services/orders/shopcart.service';
import { Billing, Order, Shipping, OrderItem } from '../services/orders/orders.interface';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/orders/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  Form: FormGroup;
  Form2: FormGroup;
  paymentForm: FormGroup;
  loading:boolean=false
  billing: Billing = {
    last_name: 'Doe',
    company: 'ABC Company',
    address_1: '123 Main Street',
    address_2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'United States',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };
  shipping: Shipping = {
    last_name: 'Smith',
    company: 'XYZ Corporation',
    address_1: '456 Elm Street',
    address_2: 'Suite 7C',
    city: 'Los Angeles',
    state: 'CA',
    postcode: '90001',
    country: 'United States',
  };
  order: Order = {
    status: 'processing',
    customer_ip_address: '127.0.0.1',
    customer_user_agent: 'Mozilla/5.0',
    billing: {
      last_name: 'Doe',
      company: 'ABC Company',
      address_1: '123 Main Street',
      address_2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postcode: '10001',
      country: 'United States',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    shipping: {
      last_name: 'Smith',
      company: 'XYZ Corporation',
      address_1: '456 Elm Street',
      address_2: 'Suite 7C',
      city: 'Los Angeles',
      state: 'CA',
      postcode: '90001',
      country: 'United States',
    },
    payment_method: 'credit_card',
    payment_method_title: 'Credit Card',
    line_items: [],
  };
  ipAddress: any;
  userAgent: any;
  constructor(private formBuilder: FormBuilder,
    public shopcartService: ShopcartService,
    private httpClient: HttpClient,
    private ShopcartService: ShopcartService,
    private orderService: OrderService,
    private router: Router,

  ) {
    shopcartService.calculSummary();
    this.getIpAddress();
  }
  getIpAddress() {
    this.httpClient.get('https://api.ipify.org/?format=json').subscribe((response: any) => {
      this.ipAddress = response.ip;
    });
    this.userAgent = navigator.userAgent;
  }
  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      payment: ['', Validators.required]
    });
    this.Form = this.formBuilder.group({
      SAfirstName: ['', Validators.required],
      SAlastName: ['', Validators.required],
      SAemail: [''],
      SAphone: ['', [Validators.required, Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)]],
      SAadress1: ['', Validators.required],
      SAadress2: [''],
      SAcountry: ['', Validators.required],
      SAcity: ['', Validators.required],
      SAstate: ['', Validators.required],
      SAcompany: [''],
      SAzip_code: [''],
    });

    this.Form2 = this.formBuilder.group({
      BIfirstName: ['', Validators.required],
      BIlastName: ['', Validators.required],
      BIemail: [''],
      BIphone: ['', [Validators.required, Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)]],
      BIadress1: ['', Validators.required],
      BIadress2: [''],
      BIcountry: ['', Validators.required],
      BIcity: ['', Validators.required],
      BIstate: ['', Validators.required],
      company: ['ok'],
      zip_code: [''],
      create_an_account: [''],
      ship_to_different_address: [''],
    });

  }

  convertNumber(e: string | undefined) {
    return Number(e);
  }
  initValues() {
    //billing address
    this.billing.last_name = this.Form2.value?.BIfirstName;
    this.billing.last_name = this.Form2.value?.BIlastName;
    this.billing.email = this.Form2.value?.BIemail;
    this.billing.phone = this.Form2.value?.BIphone;
    this.billing.address_1 = this.Form2.value?.BIadress1;
    this.billing.address_2 = this.Form2.value?.BIadress2;
    this.billing.country = this.Form2.value?.BIcountry;
    this.billing.city = this.Form2.value?.BIcity;
    this.billing.state = this.Form2.value?.BIstate;
    this.billing.company = this.Form2.value?.company;
    this.billing.postcode = this.Form2.value?.zip_code;

    // shipping address
    this.shipping.last_name = this.Form.value?.SAfirstName;
    this.shipping.last_name = this.Form.value?.SAlastName;
    this.shipping.phone = this.Form.value?.SAphone;
    this.shipping.address_1 = this.Form.value?.SAadress1;
    this.shipping.address_2 = this.Form.value?.SAadress2;
    this.shipping.country = this.Form.value?.SAcountry;
    this.shipping.city = this.Form.value?.SAcity;
    this.shipping.state = this.Form.value?.SAstate;
    this.shipping.company = this.Form.value?.SAcompany;
    this.shipping.postcode = this.Form.value?.SAzip_code;

    console.log(this.billing);
    console.log(this.shipping);

    // order

    this.order.billing = this.billing;
    this.order.shipping = this.shipping;
    this.order.customer_user_agent = this.userAgent;
    this.order.customer_user_agent = this.userAgent;
    this.order.payment_method = this.paymentForm.value?.payment;
    this.order.payment_method_title = this.paymentForm.value?.payment;
    this.order.line_items = this.ShopcartService.orderItems;
    console.log(this.order);

  }
  onSubmit() {
    this.loading=true
    this.initValues();
    this.orderService.createOrder(this.order).subscribe((e) => {
     this.ShopcartService.clearAll();
     this.loading=false;
     this.router.navigate(['/shopping-cart']);
    })
  }
}
