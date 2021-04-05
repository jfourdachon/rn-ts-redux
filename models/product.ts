class Product {
    id: string
    ownerId: string
    title: string
    imageUrl: string
    description: string
    price: number
    pushToken: string | null

    constructor(id: string, ownerId: string, title: string, imageUrl: string, description: string, price: number, pushToken: string | null) {
        this.id = id
        this.ownerId = ownerId
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
        this.pushToken = pushToken
    }
}

export default Product