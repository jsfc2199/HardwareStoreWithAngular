import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProvidersComponent } from './providers/providers.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { ProductsComponent } from './products/products.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'providers', component: ProvidersComponent, canActivate: [AuthGuardGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuardGuard]},
  {path: 'cart', component: ShopCartComponent, canActivate: [AuthGuardGuard]},

  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
