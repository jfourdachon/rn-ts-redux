class CartItem {
    quantity: number 
    productPrice: number
    productTitle: string
    pushToken: string | null
    sum: number

    constructor(quantity: number, productPrice: number, productTitle: string, pushToken: string | null, sum: number) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.sum = sum
        this.pushToken = pushToken
    }
}

export default CartItem