import { Bill } from 'src/app/models/bill.model';
import * as fromBill from './bill.actions';

export interface BillsState {
  bills: Bill[];
  isLoading: boolean;
  error: any;
}

const initialState: BillsState = {
  bills: [],
  isLoading: false,
  error: null,
};

export function BillsReducer(
  state = initialState,
  action: fromBill.BillActions
): BillsState {
  switch (action.type) {
    case fromBill.LOAD_BILLS:
      return {
        ...state,
        bills: [],
        isLoading: true,
      };
    case fromBill.GET_BILLS:
      return {
        ...state,
        bills: [...action.payload],
        isLoading: false,
        error: null,
      };
    case fromBill.GET_BILLS_FAILED:
      return {
        ...state,
        bills: [],
        isLoading: false,
        error: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case fromBill.ADD_BILLS:
      return {
        ...state,
        bills:[...state.bills, action.payload]
      }
    default:
      return state;
  }
}
