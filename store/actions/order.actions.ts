import { ThunkAction } from "redux-thunk";
import Order from "../../models/order";
import {
    OrderItem,
    AddOrder,
    SetOrders,
} from "../../typescript/types/redux/order";
import { ROOT_STATE } from "../combineReducers";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = (): ThunkAction<
    Promise<void>,
    ROOT_STATE,
    unknown,
    SetOrders
> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(
                `https://rn-ts-redux-default-rtdb.firebaseio.com/orders/${userId}.json`
            );

            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const responseData = await response.json();
            const loadedOrders: Order[] = [];
            for (const key in responseData) {
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].cartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date)
                    )
                );
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (error) {
            throw error;
        }
    };
};

export const addOrder = (
    cartItems: OrderItem[],
    totalAmount: number
): ThunkAction<Promise<void>, ROOT_STATE, unknown, AddOrder> => {
    return async (dispatch, getState) => {
        // Here any async code
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date();
        const response = await fetch(
            `https://rn-ts-redux-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                }),
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const respData = await response.json();
        console.log(respData)
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: respData.name,
                items: cartItems,
                amount: totalAmount,
                date,
            },
        });

        // send push notif to the product owner
        for (const cartItem of cartItems) {
            const pushToken = cartItem.pushToken
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: pushToken,
                    sound: 'default',
                    title: 'Order was placed',
                    body: cartItem.productTitle,
                }),
            });
        }
    };
};
