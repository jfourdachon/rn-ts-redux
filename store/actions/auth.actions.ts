import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";
import {API_KEY} from 'react-native-dotenv'

export const SIGNUP = "SIGNUP";
export const LOGIN = 'LOGIN'

export type Auth = {
  type: typeof SIGNUP | typeof LOGIN;
  authData: { email: string; password: string };
};

export const signup = (
  email: string,
  password: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, Auth> => {
  return async (dispatch) => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
        const errRespData = await response.json()
        let message = 'Something went wrong!'
        const errorId = errRespData.error.message
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already'
        } 
        throw new Error(message);
      }
      const resData = await response.json();
      dispatch({ type: SIGNUP, authData: { email, password } });
  };
};


export const login = (
    email: string,
    password: string
  ): ThunkAction<Promise<void>, ROOT_STATE, unknown, Auth> => {
    return async (dispatch) => {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
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
          const errRespData = await response.json()
          let message = 'Something went wrong!'
          const errorId = errRespData.error.message
          if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email has not been found'
          } 
          if ( errorId === 'INVALID_PASSWORD') {
            message = 'This password is invalid'
          }
          throw new Error(message);
        }
        const resData = await response.json();
        dispatch({ type: LOGIN, authData: { email, password } });
    };
  };
