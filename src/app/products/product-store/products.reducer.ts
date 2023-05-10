import { Product } from "src/app/models/product.model";
import * as fromProducts from './products.actions'

export interface ProductsState{
  products: Product[],
  isLoading: boolean,
  error:any
}

const initialState: ProductsState ={
  products: [],
  isLoading: false,
  error: null
}

export function ProductsReducer(state = initialState, action: fromProducts.ProductsActions): ProductsState{
  switch(action.type){
    case fromProducts.LOAD_PRODUCTS:
      return{
        ...state,
        products: [],
        isLoading: true,
      }
    case fromProducts.GET_PRODUCTS:
      return{
        ...state,
        products: [...action.payload],
        isLoading: false,
        error:null
      }
    case fromProducts.GET_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        products: [],
        error:{
          status: action.payload.status,
          message: action.payload.message
        }
      }
    case fromProducts.DELETE_PRODUCT:
      return {
        ...state,
      }
    case fromProducts.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case fromProducts.DELETE_PRODUCT_FAILED:
      console.error('Failed to delete product:', action.payload);
      return {
        ...state,
        error:{
          status: action.payload.status,
          message: action.payload.message
        }
      };
    default:
      return state
  }
}
