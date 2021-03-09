import Product from '../../models/product'
import PRODUCTS from '../../data/dummy-data'

export type PRODUCT_STATE = {
    availableProducts: Product[],
}

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product:Product) => product.id === 'u1')
}

export default (state = initialState, { type, payload }: any) => {
    switch (type) {

    case 'typeName':
        return { ...state, ...payload }

    default:
        return state
    }
}
