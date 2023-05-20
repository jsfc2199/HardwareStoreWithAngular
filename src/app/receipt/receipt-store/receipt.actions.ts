import { Action } from "@ngrx/store";
import { Receipt } from "src/app/models/receipt.model";

export const GET_RECEIPTS = '[RECEIPTS] get receipts'
export const LOAD_RECEIPTS = '[RECEIPTS] LOAD receipts'
export const GET_RECEIPTS_FAILED = '[RECEIPTS] get receipts failed'

export class LoadReceiptsAction implements Action {
  readonly type = LOAD_RECEIPTS
}

export class GetReceiptsAction implements Action {
  readonly type = GET_RECEIPTS;
  constructor(public payload: Receipt[]) { }
}

export class GetReceiptsFailedAction implements Action {
  readonly type = GET_RECEIPTS_FAILED;
  constructor(public payload: any) { }
}

export type RecepitActions = LoadReceiptsAction         |
                              GetReceiptsAction         |
                              GetReceiptsFailedAction
