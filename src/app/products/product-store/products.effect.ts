import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsServiceService } from "../products-service.service";
import { Injectable } from "@angular/core";
import * as fromProducts from './products.actions'
import { catchError, exhaustMap, map, of } from "rxjs";
import { Product } from "src/app/models/product.model";

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
}
