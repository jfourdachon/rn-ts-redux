import Product from "../../models/product"
import { AddToCartAction, RemoveFromCartAction } from "../../typescript/types/redux/cart"

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART ='REMOVE_FROM_CART'


export const addToCart = (product: Product): AddToCartAction => {
    return { type: ADD_TO_CART, product }
}

export const removeFromCart = (id: string): RemoveFromCartAction => {
    return { type: REMOVE_FROM_CART, id }
}