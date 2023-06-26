import { NgModule, Output } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from '../account/loginpage/loginpage.component';
import { SignuppageComponent } from '../account/signuppage/signuppage.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ShopDetailComponent } from '../shop-detail/shop-detail.component';
import { ShopPageComponent } from '../shop-page/shop-page.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "shop/:category", component: ShopPageComponent },
  { path: "shop", component: ShopPageComponent },
  { path: "shop/:category/:id", component: ShopDetailComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "shopping-cart/checkout", component: CheckoutComponent },
  { path: 'account/login', component: LoginpageComponent },
  { path: 'account/signup', component: SignuppageComponent }
];

@Output('activate')

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterModuleRoutingModule { }
