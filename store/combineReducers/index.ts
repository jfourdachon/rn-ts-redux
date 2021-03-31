import {combineReducers} from 'redux'
import { AUTH_STATE } from '../../typescript/types/redux/auth'
import { CART_ITEMS_STATE } from '../../typescript/types/redux/cart'
import { ORDER_STATE } from '../../typescript/types/redux/order'
import { PRODUCT_STATE } from '../../typescript/types/redux/product'
import authReducer from '../reducers/auth.reducer'
import cartItemsReducer from '../reducers/cart.reducer'
import ordersReducer from '../reducers/order.reducer'
import productsReducer from '../reducers/products.reducer'

export type ROOT_STATE = {
    products: PRODUCT_STATE,
    cart: CART_ITEMS_STATE,
    orders: ORDER_STATE,
    auth: AUTH_STATE
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartItemsReducer,
    orders: ordersReducer,
    auth: authReducer
})

export default rootReducer