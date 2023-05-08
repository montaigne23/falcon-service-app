import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TestserviceService } from '../services/testservice.service';
import { Product, ProductOrder, ProductQuery, RetrieveProductsResponse } from '../services/products/product.interface';
import { WoocommerceProductsService } from '../services/products/woocommerce-products.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {
  quantity: number = 1;
  slug: string | null;
  retrieveProductsResponse: RetrieveProductsResponse
  products?: Product[] = [];
  product: Product = {
    id: 1,
    name: "Product name",
    slug: "product-slug",
    permalink: "https://example.com/product",
    date_created: new Date(),
    date_created_gmt: new Date(),
    date_modified: new Date(),
    date_modified_gmt: new Date(),
    type: "simple",
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "Product description",
    short_description: "Short description",
    sku: "PROD-001",
    price: "9.99",
    regular_price: "12.99",
    sale_price: "8.99",
    date_on_sale_from: new Date(),
    date_on_sale_from_gmt: new Date(),
    date_on_sale_to: new Date(),
    date_on_sale_to_gmt: new Date(),
    price_html: "<span>$9.99</span>",
    on_sale: true,
    purchasable: true,
    total_sales: 10,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    external_url: "https://example.com/product",
    button_text: "Buy now",
    tax_status: "taxable",
    tax_class: "",
    manage_stock: true,
    stock_quantity: 100,
    in_stock: true,
    backorders: false,
    backorders_allowed: false,
    backordered: false,
    sold_individually: false,
    weight: "0.5",
    dimensions: {
      length: "10",
      width: "5",
      height: "2"
    },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.5",
    rating_count: 8,
    related_ids: [2, 3, 4],
    upsell_ids: [5, 6],
    cross_sell_ids: [7, 8],
    parent_id: 0,
    purchase_note: "",
    categories: [
      {
        id: 1,
        name: "Category 1",
        slug: "category-1",
      },
      {
        id: 2,
        name: "Category 2",
        slug: "category-2",
      }
    ],
    tags: [
      {
        id: 1,
        name: "Tag 1",
        slug: "tag-1",
        description: "",
        count: 0
      },
      {
        id: 2,
        name: "Tag 2",
        slug: "tag-2",
        description: "",
        count: 0
      }
    ],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: [],
    images: [
      {
        id: 1,
        date_created: new Date(),
        date_created_gmt: new Date(),
        date_modified: new Date(),
        date_modified_gmt: new Date(),
        src: "https://example.com/product-image.jpg",
        name: "Product image",
        alt: "Product image",
        position: 0
      }
    ]
  };
  isLoading: boolean = false;
  activeIndex = 0;
  currentPage?: number = 1;
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  loadingProduct: boolean = true;
  productOrder: ProductOrder = ProductOrder.desc
  ShortDescriptioncontent: any
  Descriptioncontent: any
  productsQuery: ProductQuery = {
    page: 1,
    per_page: 9,
    order: this.productOrder,
    include: [245, 18],
    category: ""
  }
  productQuery: ProductQuery = {
    slug: "" // category:"38"
    ,
    category: ""
  }
  constructor(private route: ActivatedRoute,
    public _TestserviceService: TestserviceService,
    private router: Router,
    private wooProducs: WoocommerceProductsService,
    private sanitizer: DomSanitizer
  ) {
    window.scroll(0, 0)
  }
  
  async ngOnInit(): Promise<void>  {
    this.loadingProduct = true;
    this.slug = this.route.snapshot.paramMap.get('id');
   // console.log(this.slug);
    
    this.productQuery.slug = this.slug
    await this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
      this.retrieveProductsResponse = response
      if (this.retrieveProductsResponse.products != undefined) {
        this.product = this.retrieveProductsResponse.products[0]
      }
      this.ShortDescriptioncontent = this.sanitizer.bypassSecurityTrustHtml(this.product.short_description);
      this.Descriptioncontent = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
      // this.products ? console.log(this.product) : null;
      this.productsQuery.include = this.product.upsell_ids
      this.wooProducs.retrieveProducts(this.productsQuery).subscribe(response => {
        this.retrieveProductsResponse = response
        this.products = this.retrieveProductsResponse.products
        console.log(this.product);
        
        this.loadingProduct = false;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });


  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  sanitizeHtml(content: string | undefined) {
    var p
    if (content != undefined) {
      p =
        this.sanitizer.bypassSecurityTrustHtml(content);
    }
    return p;
  }
  addtocard() {
    this._TestserviceService.totalData1 += this.quantity
    this.quantity = 1
  }
  plus() {
    this.quantity += 1
  }
  minus() {
    if (this.quantity > 1) {
      this.quantity -= 1
    }
  }
  async goProduct(tagname: string, id:string): Promise<void> {
    // console.log(tagname);
    window.scroll(0, 0)
    this.loadingProduct  = true
    this.router.navigate(
      ['/shop',id, tagname])
      this.slug = tagname;
      // console.log(this.slug);
       
       this.productQuery.slug = this.slug
       await this.wooProducs.retrieveProducts(this.productQuery).subscribe(response => {
         this.retrieveProductsResponse = response
         if (this.retrieveProductsResponse.products != undefined) {
           this.product = this.retrieveProductsResponse.products[0]
         }
         this.ShortDescriptioncontent = this.sanitizer.bypassSecurityTrustHtml(this.product.short_description);
         this.Descriptioncontent = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
         // this.products ? console.log(this.product) : null;
         this.productsQuery.include = this.product.upsell_ids
         this.wooProducs.retrieveProducts(this.productsQuery).subscribe(response => {
           this.retrieveProductsResponse = response
           this.products = this.retrieveProductsResponse.products
           console.log(this.product);
           
           this.loadingProduct = false;
         }, err => {
           console.log(err);
         });
       }, err => {
         console.log(err);
       });


  }
  nextImage() {
    if (this.activeIndex < this.product.images.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }

  prevImage() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.product.images.length - 1;
    }
  }

}
