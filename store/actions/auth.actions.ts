import { ThunkAction } from "redux-thunk";
import { ROOT_STATE } from "../combineReducers";

export const SIGNUP = "SIGNUP";

export type Signup = {
  type: typeof SIGNUP;
  signupData: { email: string; password: string };
};

export const signup = (
  email: string,
  password: string
): any => {
  return async (dispatch:any) => {
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
      dispatch({ type: SIGNUP, signupData: { email, password } });
  };
};
