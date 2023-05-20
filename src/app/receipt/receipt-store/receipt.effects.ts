import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReceiptService } from '../receipt.service';
import * as fromReceipts from './receipt.actions'
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';

@Injectable()
export class ReceiptEffects{
  constructor(private action$: Actions, private receiptService:ReceiptService){}

  loadReceipt$ = createEffect(()=> this.action$.pipe(
    ofType(fromReceipts.LOAD_RECEIPTS),
    exhaustMap(()=> this.receiptService.getReceipts()
    .pipe(
      map((receipt:Receipt[]) => new fromReceipts.GetReceiptsAction(receipt)
      ),
      catchError(errror => of(new fromReceipts.GetReceiptsFailedAction(errror)))
    ))
  ))
}
