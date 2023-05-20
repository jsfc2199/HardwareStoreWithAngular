import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
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
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  productToAddForm: FormGroup = new FormGroup({})
  currentProviders: Provider[] = []
  provSubscription: Subscription = new Subscription();


  constructor(private store: Store<AppState>, private productService: ProductsServiceService){}

  ngOnInit(): void {
    this.provSubscription = this.store.select('providers').subscribe((prov: ProvidersState) => {
      this.currentProviders = prov.providers
    })

    this.productToAddForm = new FormGroup({
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

    this.productToAddForm.get('provider')?.setValue('');
  }

  onSubmit(){

    const unitsAvailable = parseInt(
      this.productToAddForm.get('unitsAvailable')!.value,
      10
    );
    const minUnits = parseInt(
      this.productToAddForm.get('minUnits')!.value,
      10
    );
    const maxUnits = parseInt(
      this.productToAddForm.get('maxUnits')!.value,
      10
    );

    if (unitsAvailable < minUnits || unitsAvailable > maxUnits) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Please verify the units available. It seems that the units available are less then the minimum units, or they are greater than the maximum units',
      });

      this.productToAddForm.reset();
      this.productToAddForm.get('provider')?.setValue('');
    } else {
      const selectedProvider: Provider = this.productToAddForm.get('provider')!.value;

      const productToAdd: Product = new Product(
        nanoid(),
        minUnits,
        maxUnits,
        this.productToAddForm.get('productName')!.value,
        this.productToAddForm.get('description')!.value,
        unitsAvailable,
        parseInt(this.productToAddForm.get('price')!.value, 10),
        selectedProvider
      );

      this.productService.postProdiver(productToAdd)
      this.store.dispatch(new fromProducts.AddProductsAction(productToAdd));


      this.productToAddForm.reset();
      this.productToAddForm.get('provider')?.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.provSubscription.unsubscribe()
  }
}
