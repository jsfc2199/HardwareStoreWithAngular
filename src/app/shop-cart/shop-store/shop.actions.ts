import { Action } from "@ngrx/store";
import { CartItem } from "src/app/models/inCart.model";

export const SEND_PRODUCT_TO_CART = '[Shop Cart] Send product to cart';
export const LOAD_CART = '[Shop Cart] Load cart';

export class SendProductToCart implements Action{
  readonly type = SEND_PRODUCT_TO_CART;
  constructor(public payload: CartItem){}
}


export class LoadProductToCart implements Action{
  readonly type = LOAD_CART;
}

export type CartActions = SendProductToCart | LoadProductToCart
