import { Action } from "@ngrx/store";

export const REGISTER_USER = '[Auth] Register User'

export class RegisterUserAction implements Action{
  readonly type = REGISTER_USER;
  constructor (public payload: boolean){}
}

export type RegisterActions = RegisterUserAction
