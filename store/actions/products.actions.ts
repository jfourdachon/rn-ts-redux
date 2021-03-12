export const DELETE_PRODUCT = 'DELETE_PRODUCT'


type DeleteProduct = {
    type: typeof DELETE_PRODUCT
    id: string

}

export const deleteProduct = (productId: string): DeleteProduct => {
    return { type: DELETE_PRODUCT, id: productId }
}

export type PRODUCT_ACTIONS = DeleteProduct