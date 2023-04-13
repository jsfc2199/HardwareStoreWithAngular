import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Provider } from "src/app/models/providers.model";
import { ProvidersService } from "../providers.service";
import * as fromProviders from "./providers.actions";


@Injectable()
export class ProvidersEffects {
  constructor(private actions$: Actions, private providersService: ProvidersService){  }

  loadProviders$ = createEffect(()=> this.actions$.pipe(
    ofType(fromProviders.LOAD_PROVIDERS),
    exhaustMap(()=> this.providersService.getProviders()
      .pipe(
        map((providers: Provider[]) => new fromProviders.GetProvidersAction(providers)),
        catchError(error => of(new fromProviders.GetProvidersFailedAction(error))
        )
      )
    )
  ))
}
