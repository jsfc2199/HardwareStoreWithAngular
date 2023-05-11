import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProvidersState } from 'src/app/providers/providers-store/providers.reducer';
import { Provider } from 'src/app/models/providers.model';
import * as fromProviders from '../../providers/providers-store/providers.actions';
@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.css']
})
export class ProductEditingComponent implements OnInit {

  constructor(private store: Store<AppState>){}

  @Input() selectedProduct!: Product | null;

  productToEditForm: FormGroup = new FormGroup({})
  currentProviders: Provider[] = []

  ngOnInit(): void {
    this.store.select('providers').subscribe((prov: ProvidersState)=>{
      this.currentProviders = prov.providers;
    })

    this.productToEditForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      unitsAvailable: new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      minUnits: new FormControl(null, [Validators.required,Validators.pattern('^[1-9][0-9]*$')]),
      maxUnits: new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      provider:new FormControl(null, Validators.required),
    })

    this.store.dispatch(new fromProviders.LoadProvidersAction());

  }

  onSubmit(){
    this.productToEditForm.reset()
  }
}
