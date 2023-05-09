import { Component,OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { TestserviceService } from '../services/testservice.service';
import { CategoryQuery, ProductCategory } from '../services/categories/product-categories.interface';
import { WoocommerceCategoriesService } from '../services/categories/woocommerce-categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopServiceService } from '../services/shop-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Input() inputexemple: any

  productscategorie: ProductCategory[]
  categoryQuery : CategoryQuery = {
    parent:0
   //search:"38"
  }
  // Element pour la navigation
  private navigation: HTMLElement;
  // Écouteur d'événements
  private documentClickListener: () => void;
  // Boolean pour savoir si le menu est ouvert ou non
  public menuOuvert: boolean = false;

  constructor(public _TestserviceService :TestserviceService ,
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
}
  async navigateToCategory(id: any){
    this.toggleMenu();
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
}
