import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/providers.model';
import { ProvidersState } from 'src/app/providers/providers-store/providers.reducer';
import Swal from 'sweetalert2';
import * as fromProviders from '../../providers/providers-store/providers.actions';
import * as fromProducts from '../product-store/products.actions';
import { ProductsServiceService } from '../products-service.service';
@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.css'],
})
export class ProductEditingComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private productService: ProductsServiceService
  ) {}

  @Input() selectedProduct!: Product | null;

  productToEditForm: FormGroup = new FormGroup({});
  currentProviders: Provider[] = [];
  updateSubscription: Subscription = new Subscription();
  provSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.provSubscription = this.store.select('providers').subscribe((prov: ProvidersState) => {
      this.currentProviders = prov.providers;
    });

    this.productToEditForm = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
      unitsAvailable: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
      minUnits: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
      maxUnits: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
      provider: new FormControl(null, Validators.required),
    });

    this.store.dispatch(new fromProviders.LoadProvidersAction());

    this.productToEditForm.get('provider')?.setValue('');
  }

  onSubmit() {
    const unitsAvailable = parseInt(
      this.productToEditForm.get('unitsAvailable')!.value,
      10
    );
    const minUnits = parseInt(
      this.productToEditForm.get('minUnits')!.value,
      10
    );
    const maxUnits = parseInt(
      this.productToEditForm.get('maxUnits')!.value,
      10
    );

    if (unitsAvailable < minUnits || unitsAvailable > maxUnits) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Please verify the units available. It seems that the units available are less then the minimum units, or they are greater than the maximum units',
      });

      this.productToEditForm.reset();
      this.productToEditForm.get('provider')?.setValue('');
    } else {
      const selectedProvider: Provider =
        this.productToEditForm.get('provider')!.value;

      const productToUpdate: Product = new Product(
        this.selectedProduct!.id,
        minUnits,
        maxUnits,
        this.productToEditForm.get('productName')!.value,
        this.productToEditForm.get('description')!.value,
        unitsAvailable,
        parseInt(this.productToEditForm.get('price')!.value, 10),
        selectedProvider
      );

      this.store.dispatch(new fromProducts.UpdateProduct(productToUpdate));
      this.updateSubscription = this.productService
        .UpdateProduct(productToUpdate)
        .subscribe();

      this.productToEditForm.reset();
      this.productToEditForm.get('provider')?.setValue('');
    }
  }
  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.provSubscription.unsubscribe();
  }
}
