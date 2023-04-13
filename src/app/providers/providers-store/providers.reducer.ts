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
      console.log('entra en failed providers');
      return {
        ...state,
        error: {
          status: action.payload.status,
          message: action.payload.message
        }
      };
    default:
      return state;
  }
}
