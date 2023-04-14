import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Provider } from 'src/app/models/providers.model';
import * as fromProviders from '../providers-store/providers.actions';
import { ProvidersState } from '../providers-store/providers.reducer';
import { ProvidersFormComponent } from '../providers-form/providers-form.component';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css'],
})
export class ProvidersListComponent {

  //this in order to pay attention to the form modal and reset it when closing it
  @ViewChild(ProvidersFormComponent) private providersForm!: ProvidersFormComponent;

  constructor(
    public store: Store<AppState>
  ) {}

  allProviders: Provider[] = [];
  filteredProviders: Provider[] = [];
  providerSubscriptions: Subscription = new Subscription();
  searchTerm: string = '';

  closeModal(){
    if(this.providersForm.providerForm.dirty){
      this.providersForm.providerForm.reset()
    }
  }

  ngOnInit() {
    this.store.select('providers').subscribe((prov: ProvidersState) => {
      this.allProviders = prov.providers;
      this.filteredProviders = prov.providers;
    });

    this.store.dispatch(new fromProviders.LoadProvidersAction());
  }

  onFilter(filterValue: Event) {
    let filterValueLowerCase = (
      filterValue.target as HTMLInputElement
    ).value.toLowerCase();
    if (filterValueLowerCase === '') {
      this.filteredProviders = this.allProviders;
    } else {
      this.filteredProviders = this.allProviders.filter((provider) =>
        provider.name.toLowerCase().includes(filterValueLowerCase)
      );
    }
  }

  ngOnDestroy(): void {
    this.providerSubscriptions.unsubscribe();
  }
}
