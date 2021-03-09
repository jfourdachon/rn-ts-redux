import {combineReducers} from 'redux'
import cartItemsReducer, { CART_ITEMS_STATE } from '../reducers/cart.reducer'
import productsReducer, { PRODUCT_STATE } from '../reducers/products.reducer'

export type ROOT_STATE = {
    products: PRODUCT_STATE,
    cart: CART_ITEMS_STATE
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartItemsReducer
})

export default rootReducer