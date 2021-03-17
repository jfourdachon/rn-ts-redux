import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../typescript/types/redux/product";
import { ROOT_STATE } from "../combineReducers";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId: string): DeleteProduct => {
  return { type: DELETE_PRODUCT, id: productId };
};

export const createProduct = (
  title: string,
  imageUrl: string,
  description: string,
  price: number
): ThunkAction<void, ROOT_STATE, unknown, Action<string>> => {
  return async (dispatch) => {
    // Here any async code
    const response = await fetch(
      "https://rn-ts-redux-default-rtdb.firebaseio.com/products.json",
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
        }),
      }
    );

    const responseData = await response.json();
    console.log({responseData})
    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: responseData.name, title, imageUrl, description, price },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
): UpdateProduct => {
  return {
    type: UPDATE_PRODUCT,
    id,
    productData: { title, imageUrl, description },
  };
};
