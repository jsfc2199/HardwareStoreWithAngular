import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToShopComponent } from './product-to-shop.component';

describe('ProductToShopComponent', () => {
  let component: ProductToShopComponent;
  let fixture: ComponentFixture<ProductToShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductToShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductToShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
