import { AUTH_STATE } from "../../typescript/types/redux/auth";
import { AuthActions, AUTHENTICATE, LOGOUT } from "../actions/auth.actions";

const initialState = {
  token: "",
  userId: "",
};

export default (state: AUTH_STATE = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId };
    case LOGOUT:
          return initialState
    // case LOGIN:
    //   return { token: action.token, userId: action.userId };
    default:
      return state;
  }
};
