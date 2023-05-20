import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppReducers } from './app.reducer';
import { ProvidersComponent } from './providers/providers.component';
import { ProvidersFormComponent } from './providers/providers-form/providers-form.component';
import { ProvidersListComponent } from './providers/providers-list/providers-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditingComponent } from './products/product-editing/product-editing.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ProductToShopComponent } from './products/product-to-shop/product-to-shop.component';
import { BuyItemsComponent } from './products/buy-items/buy-items.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt/receipt-list/receipt-list.component';
import { ReceiptEffects } from './receipt/receipt-store/receipt.effects';
import { ProductsEffects } from './products/product-store/products.effect';
import { ProvidersEffects } from './providers/providers-store/providers.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProvidersComponent,
    ProvidersFormComponent,
    ProvidersListComponent,
    NavbarComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductEditingComponent,
    ShopCartComponent,
    ProductToShopComponent,
    BuyItemsComponent,
    ReceiptComponent,
    ReceiptListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(()=>initializeApp(environment.firebase)), //this allows to get access to the getAuth
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    EffectsModule.forRoot(ProvidersEffects, ProductsEffects, ReceiptEffects) //always add the effects here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
