import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { AppState } from 'src/app/app.reducer';
import { CartItem } from 'src/app/models/inCart.model';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { ProductsServiceService } from '../products-service.service';
import * as fromProducts from '../product-store/products.actions';
import { Subscription } from 'rxjs';
import * as fromCart from '../../shop-cart/shop-store/shop.actions';

@Component({
  selector: 'app-product-to-shop',
  templateUrl: './product-to-shop.component.html',
  styleUrls: ['./product-to-shop.component.css'],
})
export class ProductToShopComponent implements OnInit {
  @Input() selectedProduct!: Product | null;

  productToAdd: FormGroup = new FormGroup({});
  total: number = 0;
  totalProductsOfAnItem: number = 0;
  updateSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private productService: ProductsServiceService
  ) {}

  ngOnInit(): void {
    this.productToAdd = new FormGroup({
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  onSubmit() {
    //console.log(this.total,'value')
    //console.log(this.totalProductsOfAnItem,'items');

    /*if(this.selectedProduct == undefined){
      Swal.fire({
        icon:'error',
        title: 'Opps...',
        text: 'Sorry, but something went wrong that we can not handle, please try again later :c'
      })
    }*/

    //add validations related to the min and make the rest between units available and the totalProductsOfAnItem
    const newUnitsAvailable =
      this.selectedProduct!.unitsAvailable - this.totalProductsOfAnItem;

    if (newUnitsAvailable < 0) {
      const maxUnitAllowedToBuy = this.selectedProduct!.unitsAvailable;
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: `Sorry, but we can not have less than the minimum units available, the maximum amount of unit that you can buy are ${maxUnitAllowedToBuy}`,
      });
    } else {
      if (newUnitsAvailable < this.selectedProduct!.minUnits) {
        Swal.fire({
          icon: 'warning',
          title: 'Caution...',
          text: `In this moment we have less unit than the minimum units available, we recommend you to but new items. Minimum Units: ${
            this.selectedProduct!.minUnits
          },
            Current Units: ${newUnitsAvailable}`,
        });
      }

      //dispatch update
      const productToUpdate: Product = new Product(
        this.selectedProduct!.id,
        this.selectedProduct!.minUnits,
        this.selectedProduct!.maxUnits,
        this.selectedProduct!.productName,
        this.selectedProduct!.description,
        newUnitsAvailable,
        this.selectedProduct!.price,
        this.selectedProduct!.provider
      );

      this.store.dispatch(new fromProducts.UpdateProduct(productToUpdate));
      this.productService.UpdateProduct(productToUpdate).subscribe();

      //dispatch to cart
      const itemToAdd: CartItem = new CartItem(
        nanoid(),
        this.selectedProduct!,
        this.totalProductsOfAnItem,
        this.total
      );

      this.store.dispatch(new fromCart.SendProductToCart(itemToAdd));
      this.productToAdd.reset();
      this.productToAdd.get('amount')?.setValue(0)
    }
  }

  decrementQuantity() {
    const amount = this.productToAdd.get('amount')?.value;
    if (amount > 0) {
      this.productToAdd.get('amount')?.setValue(amount - 1);
    }
  }

  incrementQuantity() {
    const amount = this.productToAdd.get('amount')?.value;
    this.productToAdd.get('amount')?.setValue(amount + 1);
  }

  calculateTotal() {
    if (this.selectedProduct == undefined) {
      return 0;
    }

    const amount = this.productToAdd.get('amount')?.value;
    this.total = amount * this.selectedProduct!.price;
    this.totalProductsOfAnItem = amount;
    return this.total;
  }
}
