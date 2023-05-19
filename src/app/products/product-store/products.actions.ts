import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
export const GET_PRODUCTS = '[Products] get products'
export const LOAD_PRODUCTS = '[Products] LOAD Products'
export const GET_PRODUCTS_FAILED = '[Products] get Products failed'
export const DELETE_PRODUCT = '[Products] delete product'
export const DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success';
export const DELETE_PRODUCT_FAILED = '[Products] Delete Product Failed';
export const UPDATE_PRODUCT = '[Products] Update Product';
export const ADD_PRODUCT = '[Products] Add product'

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

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: string) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: string) { }
}

export class DeleteProductFailed implements Action {
  readonly type = DELETE_PRODUCT_FAILED;
  constructor(public payload: any) { }
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: Product) { }
}

export class AddProductsAction implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: Product){}
}

export type ProductsActions =
                LoadProductsAction         |
                GetProductsAction          |
                GetProvidersFailedAction   |
                DeleteProduct              |
                DeleteProductSuccess       |
                DeleteProductFailed        |
                UpdateProduct              |
                AddProductsAction
