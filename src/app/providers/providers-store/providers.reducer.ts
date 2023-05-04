import { Provider } from 'src/app/models/providers.model';
import * as fromProviders from './providers.actions';

export interface ProvidersState {
  providers: Provider[];
  error: any
}

const initialState: ProvidersState = {
  providers: [],
  error: null
};

export function ProvidersReducer(
  state = initialState,
  action: fromProviders.ProvidersActions
): ProvidersState {
  switch (action.type) {
    case fromProviders.LOAD_PROVIDERS:
      return{
        ...state
      }

    case fromProviders.GET_PROVIDERS:
      return {
        ...state,
        providers: [...action.payload]
      };
    case fromProviders.GET_PROVIDERS_FAILED:
      
      return {
        ...state,
        error: {
          status: action.payload.status,
          message: action.payload.message
        }
      };

    case fromProviders.ADD_PROVIDER:
      return {
        ...state,
        providers:[...state.providers, action.payload]
      }
    default:
      return state;
  }
}
