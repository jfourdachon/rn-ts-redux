import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";

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
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaIcuC_uw6QRXkexsTyLP8KwNDBlVdqPk`,
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
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      console.log({resData})
      dispatch({ type: SIGNUP, authData: { email, password } });
  };
};


export const login = (
    email: string,
    password: string
  ): ThunkAction<Promise<void>, ROOT_STATE, unknown, Auth> => {
    return async (dispatch) => {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaIcuC_uw6QRXkexsTyLP8KwNDBlVdqPk`,
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
          throw new Error("something went wrong!");
        }
        const resData = await response.json();
        console.log({resData})
        dispatch({ type: LOGIN, authData: { email, password } });
    };
  };
