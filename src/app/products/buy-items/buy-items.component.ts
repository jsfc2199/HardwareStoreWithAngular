import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Product } from 'src/app/models/product.model';
import * as fromProducts from '../product-store/products.actions';
import { ProductsServiceService } from '../products-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-items',
  templateUrl: './buy-items.component.html',
  styleUrls: ['./buy-items.component.css'],
})
export class BuyItemsComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private productService: ProductsServiceService
  ) {}

  @Input() selectedProduct!: Product | null;
  productToBuy: FormGroup = new FormGroup({});
  minimumUnitsToBuy: number = 0;
  updateSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.productToBuy = new FormGroup({
      quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  decrementQuantity() {
    const amount = this.productToBuy.get('quantity')?.value;

    if (amount > 0) {
      this.productToBuy.get('quantity')!.setValue(amount - 1);
    }
  }

  incrementQuantity() {
    const amount = this.productToBuy.get('quantity')?.value;
    this.productToBuy.get('quantity')!.setValue(amount + 1);
  }

  onSubmit() {
    //dispatch updated product with new quantity
    const amount = this.productToBuy.get('quantity')?.value;
    const unitsAvailable = this.selectedProduct?.unitsAvailable;

    const newUnitsAvailable = amount + unitsAvailable;

    const updatedProduct: Product = new Product(
      this.selectedProduct!.id,
      this.selectedProduct!.minUnits,
      this.selectedProduct!.maxUnits,
      this.selectedProduct!.productName,
      this.selectedProduct!.description,
      newUnitsAvailable,
      this.selectedProduct!.price,
      this.selectedProduct!.provider
    );

    this.store.dispatch(new fromProducts.UpdateProduct(updatedProduct));
    this.updateSubscription = this.productService
      .UpdateProduct(updatedProduct)
      .subscribe();

    this.productToBuy.reset()
    this.productToBuy.get('quantity')?.setValue(0);
  }

  calculateMinUnitsToBuy() {
    if (this.selectedProduct == undefined) {
      return 0;
    }
    return this.selectedProduct.minUnits - this.selectedProduct.unitsAvailable;
  }

  getMaxUnits() {
    if (this.selectedProduct == undefined) {
      return 0;
    }
    return this.selectedProduct.maxUnits;
  }
}
