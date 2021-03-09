import CartItem from "../../models/cart-item"
import Product from "../../models/product"
import { AddToCartAction, ADD_TO_CART } from "../actions/cart.actions"

type Item = {
    // TODO Probably find a better way to bind CartItem type
    [id: string]: {price: number, quantity: number, title: string, sum: number}; 
}


export type CART_ITEMS_STATE = {
    items: keyof Item;
    totalAmount: number;
}


const initialState = {
    items: <Item>{} ,
    totalAmount: 0

}

export default (state = initialState, { type, product }: AddToCartAction) => {
    switch (type) {
        case ADD_TO_CART:
            const addedProduct = product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) {
                // already have product in cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + 1
                )

            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, 1)

            }

            return { ...state.items, [addedProduct.id]: updatedOrNewCartItem, totalAmount: state.totalAmount + productPrice }


        default:
            return state
    }
}
