import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { AppState } from 'src/app/app.reducer';
import { Provider } from 'src/app/models/providers.model';
import * as fromProviders from '../providers-store/providers.actions';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css'],
})
export class ProvidersFormComponent implements OnInit {

  constructor(private providersService: ProvidersService, private store: Store<AppState>){}

  providerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.providerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
      identification: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });
  }

  onSubmit() {
    const provider = new Provider(
      nanoid(),
      this.providerForm.get('name')!.value,
      this.providerForm.get('phone')!.value,
      this.providerForm.get('identification')!.value
    );

    this.providersService.postProvider(provider)
    this.store.dispatch(new fromProviders.AddProvidersAction(provider));

    this.providerForm.reset();
  }
}
