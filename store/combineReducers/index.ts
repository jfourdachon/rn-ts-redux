import {combineReducers} from 'redux'
import productsReducer, { PRODUCT_STATE } from '../reducers/products.reducer'

export type ROOT_STATE = {
    products: PRODUCT_STATE
}

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer