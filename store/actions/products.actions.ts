import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import Product from "../../models/product";
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../typescript/types/redux/product";
import { ROOT_STATE } from "../combineReducers";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = (): ThunkAction<Promise<Product[]>, ROOT_STATE, unknown, AnyAction> => {
  return async (dispatch) => {
    // Here any async code
    async function onSuccess(products: Product[]) {
      dispatch({type: SET_PRODUCTS, products: products})  
      return products;
    }
    try {
    const response = await fetch(
      "https://rn-ts-redux-default-rtdb.firebaseio.com/products.json"
    );

    if(!response.ok) {
      throw new Error('Something went wrong.')
    }

    const responseData = await response.json();
    const loadedProducts: Product[] = [];
    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }
    return onSuccess(loadedProducts)
  } catch (error) {
      throw error
  }
  };
};

export const deleteProduct = (productId: string): ThunkAction<Promise<void>, ROOT_STATE, unknown, DeleteProduct>  => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-ts-redux-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    if(!response.ok) {
      throw Error('something went wrong')
    }
    dispatch ({ type: DELETE_PRODUCT, id: productId });
  }
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
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
): ThunkAction<Promise<void>, ROOT_STATE, unknown, UpdateProduct>  => {
  return async (dispatch) => {
    const response = await fetch(
      `https://rn-ts-redux-default-rtdb.firebaseio.com/products/${id}.json`,
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
    if(!response.ok) {
      throw Error('something went wrong')
    }
    dispatch({
      type: UPDATE_PRODUCT,
      id,
      productData: { title, imageUrl, description }
    })
  };
};
