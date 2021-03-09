import Product from "../../models/product"

export const ADD_TO_CART = 'ADD_TO_CART'

export type AddToCartAction = {
    type: typeof ADD_TO_CART
    product: Product
}


export const addToCart = (product: Product): AddToCartAction => {
    return { type: ADD_TO_CART, product: product }
}