import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BillService } from "../bill.service";
import * as fromBills from './bill.actions'
import { catchError, exhaustMap, map, of } from "rxjs";
import { Bill } from "src/app/models/bill.model";
import { Injectable } from "@angular/core";

@Injectable()
export class BillEffecs {
  constructor(private actions$: Actions, private billService: BillService) { }

  loadBills$ = createEffect(()=> this.actions$.pipe(
    ofType(fromBills.LOAD_BILLS),
    exhaustMap(()=> this.billService.getBills()
    .pipe(
      map((receipt:Bill[]) => new fromBills.GetBillsAction(receipt)
      ),
      catchError(errror => of(new fromBills.GetBillsFailedAction(errror)))
    ))
  ))
}
