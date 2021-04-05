import Product from "../../models/product";
import PRODUCTS from "../../data/dummy-data";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products.actions";
import { PRODUCT_ACTIONS } from "../../typescript/types/redux/product";

type state = {
  availableProducts: Product[];
  userProducts: Product[];
};

const initialState: state = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action: PRODUCT_ACTIONS) => {
  switch (action.type) {
    case SET_PRODUCTS: 
        return {
            availableProducts: action.products,
            userProducts: action.userProducts
        }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
        action.productData.pushToken
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.id
      );
      const updatedProduct = new Product(
        action.id,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
        state.userProducts[productIndex].pushToken
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
      };

    default:
      return state;
  }
};
