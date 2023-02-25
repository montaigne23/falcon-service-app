import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmsignupComponent } from './confirmsignup.component';

describe('ConfirmsignupComponent', () => {
  let component: ConfirmsignupComponent;
  let fixture: ComponentFixture<ConfirmsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
