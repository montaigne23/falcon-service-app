import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './home-page/carousel/carousel.component';
import { FeaturedComponent } from './home-page/featured/featured.component';
import { CategoriesComponent } from './home-page/categories/categories.component';
import { ProductsComponent } from './home-page/products/products.component';
import { OfferComponent } from './home-page/offer/offer.component';
import { RecentProductsComponent } from './home-page/recent-products/recent-products.component';
import { VendorComponent } from './home-page/vendor/vendor.component';
import { RouterModuleRoutingModule } from './router-module/router-module-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShopProductStartComponent } from './shop-page/shop-product-start/shop-product-start.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginpageComponent } from './account/loginpage/loginpage.component';
import { SignuppageComponent } from './account/signuppage/signuppage.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ConfirmsignupComponent } from './account/signuppage/confirmsignup/confirmsignup.component';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { SearchComponent } from './search/search.component';
import { StatusAccountComponent } from './account/status-account/status-account.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterPageComponent,
    TopbarComponent,
    NavbarComponent,
    CarouselComponent,
    FeaturedComponent,
    CategoriesComponent,
    ProductsComponent,
    OfferComponent,
    RecentProductsComponent,
    VendorComponent,
    ShopPageComponent,
    ShopDetailComponent,
    ShopProductStartComponent,
    ShoppingCartComponent,
    LoginpageComponent,
    SignuppageComponent,
    ConfirmsignupComponent,
    ForgotpasswordComponent,
    SearchComponent,
    StatusAccountComponent,
    LoadingModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CarouselModule,
    BrowserModule,
    RouterModuleRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
