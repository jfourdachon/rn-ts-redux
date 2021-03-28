import { ThunkAction } from "redux-thunk";
import { OrderItem, AddOrder } from "../../typescript/types/redux/order";
import { ROOT_STATE } from "../combineReducers";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (
  cartItems: OrderItem[],
  totalAmount: number
): ThunkAction<Promise<void>, ROOT_STATE, unknown, AddOrder> => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      `https://rn-ts-redux-default-rtdb.firebaseio.com/orders/u1.json`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const respData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: respData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};
