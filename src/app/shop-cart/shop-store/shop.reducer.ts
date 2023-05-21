import { CartItem } from "src/app/models/inCart.model";
import * as fromCart from './shop.actions'

export interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: []
};

export function CartReducer(state = initialState, action: fromCart.CartActions): CartState {
  switch (action.type) {
    case fromCart.LOAD_CART:
      return {
        ...state
      }
    case fromCart.SEND_PRODUCT_TO_CART:
      const existingProductIndex = state.products.findIndex(product => product.product.id === action.payload.product.id)

      //if existingProductIndex  = -1 product not found in cart so is a new entry
      //if existingProductIndex != -1 product in cart, so it is neccesary to update the information
      if (existingProductIndex !== -1) {
        const updatedProducts = state.products.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              totalItems: product.totalItems + action.payload.totalItems,
              totalValue: product.totalValue + action.payload.totalValue,
            }
          }
          return product
        })
        return {
          ...state,
          products: updatedProducts
        }
      }

      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case fromCart.CLEAR_CART:
      return {
        ...state,
        products: []
      }
    default:
      return {
        ...state
      }
  }
}
