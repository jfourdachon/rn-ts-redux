import { OrderItem } from "../store/actions/order.actions"

class Order {

    id: string
    items: OrderItem
    totalAMount: number
    date: Date

    constructor(id: string, items: OrderItem, totalAmount: number, date: Date) {
        this.id = id
        this.items = items
        this.totalAMount = totalAmount
        this.date = date
    }
}

export default Order