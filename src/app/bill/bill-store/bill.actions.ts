import { Action } from "@ngrx/store";
import { Bill } from "src/app/models/bill.model";

export const GET_BILLS = '[BILLS] get bills'
export const LOAD_BILLS = '[BILLS] LOAD bills'
export const GET_BILLS_FAILED = '[BILLS] get bills failed'
export const ADD_BILLS = '[BILLS] Add receipt'

export class LoadBillsAction implements Action {
  readonly type = LOAD_BILLS
}

export class GetBillsAction implements Action {
  readonly type = GET_BILLS;
  constructor(public payload: Bill[]) { }
}

export class GetBillsFailedAction implements Action {
  readonly type = GET_BILLS_FAILED;
  constructor(public payload: any) { }
}

export class AddBillAction implements Action {
  readonly type = ADD_BILLS;
  constructor(public payload: Bill){}
}

export type BillActions =  LoadBillsAction        |
                              GetBillsAction         |
                              GetBillsFailedAction   |
                              AddBillAction
