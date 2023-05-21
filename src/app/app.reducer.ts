import { ActionReducerMap } from '@ngrx/store';
import * as fromRegister from './auth/register/register-store/register.reducer';
import * as fromProviders from './providers/providers-store/providers.reducer'
import * as fromLogout from './auth/auth.logout.reducer';
import * as fromProducts from './products/product-store/products.reducer'
import * as fromCart from './shop-cart/shop-store/shop.reducer'
import * as fromReceipts from './receipt/receipt-store/receipt.reducer'
import * as fromBills from './bill/bill-store/bill.reducer'


export interface AppState{
  register: fromRegister.RegisterState,
  providers: fromProviders.ProvidersState
  logout: fromLogout.LogoutState,
  products: fromProducts.ProductsState,
  shopCart: fromCart.CartState
  receipts: fromReceipts.ReceiptsState,
  bills: fromBills.BillsState
 }

 export const AppReducers: ActionReducerMap<AppState, any> ={
   register: fromRegister.RegisterReducer,
   providers: fromProviders.ProvidersReducer,
   logout: fromLogout.AuthReducerLogout,
   products: fromProducts.ProductsReducer,
   shopCart: fromCart.CartReducer,
   receipts: fromReceipts.ReceiptsReducer,
   bills: fromBills.BillsReducer
 }
