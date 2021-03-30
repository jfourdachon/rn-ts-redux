import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";
import { REACT_NATIVE_API_KEY } from "@env";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export type AuthActions = {
  type: typeof SIGNUP | typeof LOGIN;
  token: string;
  userId: string;
};

export const signup = (
  email: string,
  password: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, AuthActions> => {
  return async (dispatch) => {
    console.log(REACT_NATIVE_API_KEY);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_NATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errRespData = await response.json();
      let message = "Something went wrong!";
      const errorId = errRespData.error.message;
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (
  email: string,
  password: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, AuthActions> => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_NATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errRespData = await response.json();
      let message = "Something went wrong!";
      const errorId = errRespData.error.message;
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email has not been found";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "This password is invalid";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
