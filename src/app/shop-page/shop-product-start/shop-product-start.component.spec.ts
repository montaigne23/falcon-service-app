import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductStartComponent } from './shop-product-start.component';

describe('ShopProductStartComponent', () => {
  let component: ShopProductStartComponent;
  let fixture: ComponentFixture<ShopProductStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopProductStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProductStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
