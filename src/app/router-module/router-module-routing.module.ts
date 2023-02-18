import { NgModule, Output} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { ShopDetailComponent } from '../shop-detail/shop-detail.component';
import { ShopPageComponent } from '../shop-page/shop-page.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: "",  redirectTo: "home",  pathMatch: "full" },
  { path: "home",   component: HomePageComponent},
  {path:"shop", component: ShopPageComponent},
{path: "shop/:id", component: ShopDetailComponent},
{path: "shopping-cart", component: ShoppingCartComponent}
];

@Output('activate')

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterModuleRoutingModule { }
