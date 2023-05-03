import { ActionReducerMap } from '@ngrx/store';
import * as fromRegister from './auth/register/register-store/register.reducer';
import * as fromProviders from './providers/providers-store/providers.reducer'
import * as fromLogout from './auth/auth.logout.reducer';


export interface AppState{
  register: fromRegister.RegisterState,
  providers: fromProviders.ProvidersState
  logout: fromLogout.LogoutState
 }

 export const AppReducers: ActionReducerMap<AppState, any> ={
   register: fromRegister.RegisterReducer,
   providers: fromProviders.ProvidersReducer,
   logout: fromLogout.AuthReducerLogout
 }
