import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'


type DeleteProduct = {
    type: typeof DELETE_PRODUCT
    id: string
}

type CreateProduct = {
    type: typeof CREATE_PRODUCT
    productData: {
        title: string
        imageUrl: string
        description: string
        price: number
    }
}


type UpdateProduct = {
    type: typeof UPDATE_PRODUCT
    id: string
    productData: {
        title: string
        imageUrl: string
        description: string
    }
}


export const deleteProduct = (productId: string): DeleteProduct => {
    return { type: DELETE_PRODUCT, id: productId }
}

export const createProduct = (title: string, imageUrl: string, description: string, price: number): CreateProduct => {
    return { type: CREATE_PRODUCT, productData: { title, imageUrl, description, price } }
}

export const updateProduct = (id: string, title: string, imageUrl: string, description: string): UpdateProduct => {
    return { type: UPDATE_PRODUCT, id, productData: { title, imageUrl, description } }
}

export type PRODUCT_ACTIONS = DeleteProduct | CreateProduct | UpdateProduct