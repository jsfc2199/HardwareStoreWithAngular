import { ActionReducerMap } from '@ngrx/store';
import * as fromRegister from './auth/register/register-store/register.reducer';


export interface AppState{
  register: fromRegister.RegisterState
 }

 export const AppReducers: ActionReducerMap<AppState, any> ={
   register: fromRegister.RegisterReducer
 }
