import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";
import { REACT_NATIVE_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTENTICATE";
export const SET_DID_TRY_AUTO_LOGIN = "SET_DID_TRY_AUTO_LOGIN"

let timer:  ReturnType<typeof setTimeout>;

export type AuthActions = {
  type: typeof LOGOUT | typeof AUTHENTICATE | typeof SET_DID_TRY_AUTO_LOGIN;
  token: string;
  userId: string;
  didTryAutoLogin?: boolean
};

export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN }
}

export const authenticate = (userId: string, token: string, expirytime: number): ThunkAction<void, ROOT_STATE, unknown, AuthActions> => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirytime))
    dispatch({ type: AUTHENTICATE, userId, token });
  }
};

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
    dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000));
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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
    dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);

  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  clearLogoutTimer()
  return { type: LOGOUT };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationsDate: Date
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationsDate.toISOString() })
  );
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}
const setLogoutTimer = (
  expirationTime: number
): ThunkAction<any, any, any, any> => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
