import CartItem from "../../models/cart-item"
import { ADD_TO_CART, CART_ACTIONS, REMOVE_FROM_CART } from "../actions/cart.actions"

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

export default (state = initialState, action: CART_ACTIONS) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) {
                // already have product in cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                )

            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice)

            }

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.id]
            const curretnQty = selectedItem.quantity
            let updatedCartItems
            if (curretnQty > 1) {
                const updatedcartItem = new CartItem(selectedItem.quantity - 1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.sum - selectedItem.productPrice)
                updatedCartItems = {...state.items, [action.id]: updatedcartItem}

            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.id]
            }
            return {...state, 
            items: updatedCartItems,
            totalAmount: state.totalAmount - selectedItem.productPrice
        }


        default:
            return state
    }
}
