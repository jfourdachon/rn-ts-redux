import CartItem from "../../models/cart-item"
import Product from "../../models/product"
import { AddToCartAction, ADD_TO_CART } from "../actions/cart.actions"

export type ItemCart = {
    // TODO Probably find a better way to bind CartItem type
    [id: string]: { productPrice: number, quantity: number, productTitle: string, sum: number };
}


export type CART_ITEMS_STATE = {
    items: ItemCart;
    totalAmount: number;
}


const initialState = {
    items: <ItemCart>{},
    totalAmount: 0

}

export default (state = initialState, { type, product }: AddToCartAction) => {
    switch (type) {
        case ADD_TO_CART:

            const addedProduct = product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            let updatedOrNewCartItem

            console.log(state)

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

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice
            }


        default:
            return state
    }
}
