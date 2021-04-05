
import Product from "../../../models/product"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../../store/actions/cart.actions"

/* Actions */

export type AddToCartAction = {
    type: typeof ADD_TO_CART
    product: Product
}

export type RemoveFromCartAction = {
    type: typeof REMOVE_FROM_CART
    id: string
}

export type CART_ACTIONS = AddToCartAction | RemoveFromCartAction

/* Reducer */

export type ItemCart = {
    [id: string]: { productPrice: number, quantity: number, productTitle: string, sum: number, pushToken: string };
}


export type CART_ITEMS_STATE = {
    items: ItemCart;
    totalAmount: number;
}

