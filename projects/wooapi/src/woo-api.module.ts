import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
    AuthService,
    WoocommerceCategoriesService,
    WoocommerceCouponService,
    WoocommerceCustomerService,
    WoocommerceOrderService,
    WoocommerceOrderNoteService,
    WoocommerceAttributeService,
    WoocommerceReviewService,
    WoocommerceProductVariationService,
    WoocommerceProductsService,
    WoocommerceRefundsService,
    WoocommerceTagsService,
    WoocommerceHelperService
} from './wooApi';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    WoocommerceCategoriesService,
    WoocommerceCouponService,
    WoocommerceCustomerService,
    WoocommerceOrderNoteService,
    WoocommerceOrderService,
    WoocommerceAttributeService,
    WoocommerceReviewService,
    WoocommerceProductVariationService,
    WoocommerceProductsService,
    WoocommerceRefundsService,
    WoocommerceTagsService,
    WoocommerceHelperService
  ]
})
export class WooApiModule { }
