import { Action } from "@ngrx/store";
import { Provider } from "src/app/models/providers.model";

export const GET_PROVIDERS = '[Providers] get providers'
export const LOAD_PROVIDERS = '[Providers] LOAD providers'
export const GET_PROVIDERS_FAILED = '[Providers] get providers failed'
export const ADD_PROVIDER = '[Providers] Add provider'

export class LoadProvidersAction implements Action {
  readonly type = LOAD_PROVIDERS;
}

export class GetProvidersAction implements Action {
  readonly type = GET_PROVIDERS;
  constructor(public payload: Provider[]){}
}

export class GetProvidersFailedAction implements Action {
  readonly type = GET_PROVIDERS_FAILED;
  constructor(public payload: any){}
}

export class AddProvidersAction implements Action {
  readonly type = ADD_PROVIDER;
  constructor(public payload: Provider){}
}

export type ProvidersActions = GetProvidersAction | GetProvidersFailedAction | LoadProvidersAction | AddProvidersAction
