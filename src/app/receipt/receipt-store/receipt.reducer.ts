import { Receipt } from 'src/app/models/receipt.model';
import * as fromReceipts from './receipt.actions';

export interface ReceiptsState {
  receipts: Receipt[];
  isLoading: boolean;
  error: any;
}

const initialState: ReceiptsState = {
  receipts: [],
  isLoading: false,
  error: null,
};

export function ReceiptsReducer(
  state = initialState,
  action: fromReceipts.RecepitActions
): ReceiptsState {
  switch (action.type) {
    case fromReceipts.LOAD_RECEIPTS:
      return {
        ...state,
        receipts: [],
        isLoading: true,
      };
    case fromReceipts.GET_RECEIPTS:
      return {
        ...state,
        receipts: [...action.payload],
        isLoading: false,
        error: null,
      };
    case fromReceipts.GET_RECEIPTS_FAILED:
      return {
        ...state,
        receipts: [],
        isLoading: false,
        error: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case fromReceipts.ADD_RECEIPTS:
      return {
        ...state,
        receipts:[...state.receipts, action.payload]
      }
    default:
      return state;
  }
}
