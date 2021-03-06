import {combineReducers} from 'redux'
import productsReducer from '../reducers/products.reducer'

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer