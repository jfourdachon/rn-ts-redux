import Product from '../../models/product'
import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, PRODUCT_ACTIONS } from '../actions/products.actions'

export type PRODUCT_STATE = {
    availableProducts: Product[],
    userProducts: Product[],
}

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product: Product) => product.ownerId === 'u1')
}

export default (state = initialState, action: PRODUCT_ACTIONS) => {
    switch (action.type) {

        case DELETE_PRODUCT:
            return { ...state, userProducts: state.userProducts.filter(product => product.id !== action.id), availableProducts: state.availableProducts.filter(product => product.id !== action.id) }

        default:
            return state
    }
}
