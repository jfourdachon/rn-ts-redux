import { AUTH_STATE } from "../../typescript/types/redux/auth";
import { AuthActions, AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from "../actions/auth.actions";

const initialState = {
  token: "",
  userId: "",
  didTryAutoLogin: false
};

export default (state: AUTH_STATE = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId, didTryAutoLogin: true };
    case SET_DID_TRY_AUTO_LOGIN:  
        return {
            ...state,
            didTryAutoLogin: true
        }
    case LOGOUT:
          return initialState
    // case LOGIN:
    //   return { token: action.token, userId: action.userId };
    default:
      return state;
  }
};
