import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
export const GET_PRODUCTS = '[Products] get products'
export const LOAD_PRODUCTS = '[Products] LOAD Products'
export const GET_PRODUCTS_FAILED = '[Products] get Products failed'

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS
}

export class GetProductsAction implements Action {
  readonly type = GET_PRODUCTS;
  constructor(public payload: Product[]) { }
}

export class GetProvidersFailedAction implements Action {
  readonly type = GET_PRODUCTS_FAILED;
  constructor(public payload: any) { }
}

export type ProductsActions =
                LoadProductsAction         |
                GetProductsAction          |
                GetProvidersFailedAction
