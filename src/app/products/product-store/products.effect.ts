import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsServiceService } from "../products-service.service";
import { Injectable } from "@angular/core";
import * as fromProducts from './products.actions'
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Product } from "src/app/models/product.model";
import { Action } from '@ngrx/store';

@Injectable()
export class ProductsEffects{

  constructor(private actions$: Actions, private productService: ProductsServiceService){}

  loadProducts$ = createEffect(()=> this.actions$.pipe(
    ofType(fromProducts.LOAD_PRODUCTS),
    exhaustMap(()=> this.productService.getProducts()
      .pipe(
        map((products: Product[]) => new fromProducts.GetProductsAction(products)),
        catchError(error => of(new fromProducts.GetProvidersFailedAction(error)))
      ))
  ))

  deleteProduct$ = createEffect(()=> this.actions$.pipe(
    ofType(fromProducts.DELETE_PRODUCT),
    mergeMap((action: fromProducts.DeleteProduct)=>
      this.productService.deleteProduct(action.payload).pipe(
        map(()=> new fromProducts.DeleteProductSuccess(action.payload)),
        catchError(error => of (new fromProducts.DeleteProductFailed(error.message)))
      ))
  ))
}
