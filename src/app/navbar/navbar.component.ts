import { Component,OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { TestserviceService } from '../services/testservice.service';
import { CategoryQuery, ProductCategory } from '../services/categories/product-categories.interface';
import { WoocommerceCategoriesService } from '../services/categories/woocommerce-categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopServiceService } from '../services/shop-service.service';
import { ShopcartService } from '../services/orders/shopcart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Input() inputexemple: any

  productscategorie: ProductCategory[]
  productsSubcategorie: ProductCategory[]
  categoryQuery : CategoryQuery = {
    parent:50
   //search:"38"
  }
  // Element pour la navigation
  private navigation: HTMLElement;
  private menu: HTMLElement;
  // Écouteur d'événements
  private documentClickListener: () => void;
  private documentClickListener2: () => void;
  // Boolean pour savoir si le menu est ouvert ou non
  public menuOuvert: boolean = false;
  public menuOuvert2: boolean = false;

  constructor(public ShopcartService:ShopcartService,
    private woocategorie: WoocommerceCategoriesService,
    private router: Router,
    public shopServiceService:ShopServiceService,
    private route: ActivatedRoute,private renderer: Renderer2, private elementRef: ElementRef
    ){
  }
  ngOnInit() {
    this.woocategorie.retrieveCategories(this.categoryQuery).subscribe(response => {
      this.productscategorie = response;
      console.log(response);
    }, err => {
      console.log(err);
    })

  }
  ngAfterViewInit() {
    this.navigation = this.elementRef.nativeElement.querySelector('.navbar-vertical');
    this.menu = this.elementRef.nativeElement.querySelector('#navbarCollapse');
}
  async navigateToCategory(id: any){
    this.toggleMenu();
    this.toggleMenu2();
   await this.router.navigate(
      ['/shop',id]);

     this.shopServiceService.getProduct(id || "")
  }

  public toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
    if (this.menuOuvert) {
        this.renderer.addClass(this.navigation, 'show');
        this.documentClickListener = this.renderer.listen('document', 'click', (event: any) => {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                this.menuOuvert = false;
                this.renderer.removeClass(this.navigation, 'show');
                this.documentClickListener();
            }
        });
    } else {
        this.renderer.removeClass(this.navigation, 'show');
    }
}
  public toggleMenu2() {

    this.menuOuvert2 = !this.menuOuvert2;
    if (this.menuOuvert2) {
      this.renderer.addClass(this.menu, 'show');
      console.log("ok");
        this.documentClickListener2 = this.renderer.listen('document', 'click', (event: any) => {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                this.menuOuvert = false;
                this.renderer.removeClass(this.menu, 'show');
                this.documentClickListener2();
            }
        });
    } else {
        this.renderer.removeClass(this.menu, 'show');
    }
}
}
