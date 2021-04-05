import CartItem from "../../models/cart-item"
import { CART_ACTIONS, ItemCart } from "../../typescript/types/redux/cart"
import { ORDER_ACTIONS } from "../../typescript/types/redux/order"
import { PRODUCT_ACTIONS } from "../../typescript/types/redux/product"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.actions"
import { ADD_ORDER } from "../actions/order.actions"
import { DELETE_PRODUCT } from "../actions/products.actions"


const initialState = {
    items: <ItemCart>{},
    totalAmount: 0
}

export default (state = initialState, action: CART_ACTIONS | ORDER_ACTIONS | PRODUCT_ACTIONS) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            const pushToken = addedProduct.pushToken
            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) {
                // already have product in cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    pushToken,
                    state.items[addedProduct.id].sum + productPrice
                )

            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, pushToken, productPrice)

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
                const updatedcartItem = new CartItem(selectedItem.quantity - 1, selectedItem.productPrice, selectedItem.productTitle, selectedItem.pushToken , selectedItem.sum - selectedItem.productPrice)
                updatedCartItems = { ...state.items, [action.id]: updatedcartItem }

            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.id]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }

        case ADD_ORDER:
            return initialState

        case DELETE_PRODUCT:
            if (!state.items[action.id]) {
                return state
            } else {

                const updatedItems = { ...state.items }
                const itemTotal = state.items[action.id].sum
                delete updatedItems[action.id]
                return { ...state, items: updatedItems, totalAmount: state.totalAmount - itemTotal }
            }
        default:
            return state
    }
}
