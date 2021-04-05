import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import Product from "../../models/product";
import {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
} from "../../typescript/types/redux/product";
import { ROOT_STATE } from "../combineReducers";

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = (): ThunkAction<Promise<Product[]>, ROOT_STATE, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        // Here any async code
        async function onSuccess(products: Product[]) {
            dispatch({ type: SET_PRODUCTS, products: products, userProducts: products.filter(prod => prod.ownerId === userId) })
            return products;
        }
        try {
            const response = await fetch(
                "https://rn-ts-redux-default-rtdb.firebaseio.com/products.json"
            );

            if (!response.ok) {
                throw new Error('Something went wrong.')
            }

            const responseData = await response.json();
            const loadedProducts: Product[] = [];
            for (const key in responseData) {
                loadedProducts.push(
                    new Product(
                        key,
                        responseData[key].ownerId,
                        responseData[key].title,
                        responseData[key].imageUrl,
                        responseData[key].description,
                        responseData[key].price,
                        responseData[key].pushToken
                    )
                );
            }
            return onSuccess(loadedProducts)
        } catch (error) {
            throw error
        }
    };
};

export const deleteProduct = (productId: string): ThunkAction<Promise<void>, ROOT_STATE, unknown, DeleteProduct> => {
    return async (dispatch, getState) => {
        const token = getState().auth.token

        const response = await fetch(
            `https://rn-ts-redux-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw Error('something went wrong')
        }
        dispatch({ type: DELETE_PRODUCT, id: productId });
    }
};

export const createProduct = (
    title: string,
    imageUrl: string,
    description: string,
    price: number
): ThunkAction<Promise<void>, ROOT_STATE, unknown, CreateProduct> => {
    return async (dispatch, getState) => {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let pushToken
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        if (permission.status !== 'granted') {
            pushToken = null;
        } else {

            pushToken = (await Notifications.getExpoPushTokenAsync()).data
        }
        // Http request to save the push token in the user DB

        // Here any async code
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(
            `https://rn-ts-redux-default-rtdb.firebaseio.com/products.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                    ownerId: userId,
                    pushToken: pushToken
                }),
            }
        );

        const responseData = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: responseData.name,
                title,
                imageUrl,
                description,
                price,
                ownerId: userId,
                pushToken
            }
        });
    };
};

export const updateProduct = (
    id: string,
    title: string,
    imageUrl: string,
    description: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, UpdateProduct> => {
    return async (dispatch, getState) => {
        // Here any async code
        const token = getState().auth.token
        const response = await fetch(
            `https://rn-ts-redux-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                }),
            }
        );
        if (!response.ok) {
            throw Error('something went wrong')
        }
        dispatch({
            type: UPDATE_PRODUCT,
            id,
            productData: { title, imageUrl, description }
        })
    };
};
