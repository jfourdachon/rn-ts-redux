import {combineReducers} from 'redux'
import cartItemsReducer, { CART_ITEMS_STATE } from '../reducers/cart.reducer'
import ordersReducer, { ORDER_STATE } from '../reducers/order.reducer'
import productsReducer, { PRODUCT_STATE } from '../reducers/products.reducer'

export type ROOT_STATE = {
    products: PRODUCT_STATE,
    cart: CART_ITEMS_STATE,
    orders: ORDER_STATE
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartItemsReducer,
    orders: ordersReducer
})

export default rootReducer