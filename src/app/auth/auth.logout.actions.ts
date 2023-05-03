import { Action } from "@ngrx/store";

export const LOGOUT_USER = '[Auth] logout'

export class LogOutAction implements Action{
  readonly type = LOGOUT_USER;
  constructor (public payload: boolean){}
}

export type AuthActions = LogOutAction
