import * as fromRegister from './register.actions';

export interface RegisterState {
  isUserCreated: boolean;
}

const initialState: RegisterState = {
  isUserCreated: false,
};

export function RegisterReducer(
  state = initialState,
  action: fromRegister.RegisterActions
): RegisterState {
  switch (action.type) {
    case fromRegister.REGISTER_USER:
      return {
        isUserCreated: action.payload,
      };

    default:
      return state;
  }
}
