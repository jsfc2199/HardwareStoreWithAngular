import * as fromLogout from './auth.logout.actions';
export interface LogoutState {
  isUserCreated: boolean;
}

const initialState: LogoutState = {
  isUserCreated: false,
};
export function AuthReducerLogout (state = initialState, action:fromLogout.AuthActions): LogoutState{
  switch(action.type){
    case fromLogout.LOGOUT_USER:
      return {
        isUserCreated: action.payload,
      };
    default:
      return state
  }
}
