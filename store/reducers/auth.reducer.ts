import { AuthActions, LOGIN, SIGNUP } from "../actions/auth.actions";

export type AuthState = {
  token: string;
  userId: string;
};

const initialState = {
  token: "",
  userId: "",
};

export default (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case SIGNUP:
      return { token: action.token, userId: action.userId };
    case LOGIN:
      return { token: action.token, userId: action.userId };
    default:
      return state;
  }
};
