import Product from "../../../models/product"
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../../../store/actions/products.actions"

/* Actions */

export type DeleteProduct = {
    type: typeof DELETE_PRODUCT
    id: string
}

export type CreateProduct = {
    type: typeof CREATE_PRODUCT
    productData: {
        title: string
        imageUrl: string
        description: string
        price: number
    }
}

export type UpdateProduct = {
    type: typeof UPDATE_PRODUCT
    id: string
    productData: {
        title: string
        imageUrl: string
        description: string
    }
}

export type PRODUCT_ACTIONS = DeleteProduct | CreateProduct | UpdateProduct

/* Reducer */


export type PRODUCT_STATE = {
    availableProducts: Product[],
    userProducts: Product[],
}
