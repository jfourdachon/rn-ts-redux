import Product from "../../models/product"

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART ='REMOVE_FROM_CART'

type AddToCartAction = {
    type: typeof ADD_TO_CART
    product: Product
}

type RemoveFromCartAction = {
    type: typeof REMOVE_FROM_CART
    id: string
}

export type CART_ACTIONS = AddToCartAction | RemoveFromCartAction

export const addToCart = (product: Product): AddToCartAction => {
    return { type: ADD_TO_CART, product }
}

export const removeFromCart = (id: string): RemoveFromCartAction => {
    return { type: REMOVE_FROM_CART, id }
}