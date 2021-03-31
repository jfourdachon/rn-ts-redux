import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";
import { REACT_NATIVE_API_KEY } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = 'AUTENTICATE'

export type AuthActions = {
  type: typeof SIGNUP | typeof LOGIN | typeof AUTHENTICATE;
  token: string;
  userId: string;
};

export const authenticate = (userId: string, token: string): AuthActions => {
  return { type: AUTHENTICATE, userId, token }
}

export const signup = (
  email: string,
  password: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, AuthActions> => {
  return async (dispatch) => {
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
    dispatch(authenticate(resData.localId,resData.idToken));
    const expirationate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationate)
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
    dispatch(authenticate(resData.localId,resData.idToken));
    const expirationate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationate)
  };
};


const saveDataToStorage = (token: string, userId: string, expirationsDate: Date) => {
  AsyncStorage.setItem('userData', JSON.stringify({token, userId, expiryDate: expirationsDate.toISOString()}))
}