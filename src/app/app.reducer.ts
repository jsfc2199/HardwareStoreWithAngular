import { ActionReducerMap } from '@ngrx/store';
import * as fromRegister from './auth/register/register-store/register.reducer';
import * as fromProviders from './providers/providers-store/providers.reducer'


export interface AppState{
  register: fromRegister.RegisterState,
  providers: fromProviders.ProvidersState
 }

 export const AppReducers: ActionReducerMap<AppState, any> ={
   register: fromRegister.RegisterReducer,
   providers: fromProviders.ProvidersReducer
 }
