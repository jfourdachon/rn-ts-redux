import Order from "../../../models/order"
import { ADD_ORDER } from "../../../store/actions/order.actions"


/* Actions */

export type OrderItem = {
    id: string
        productTitle: string
        productPrice: number,
        quantity: number,
        sum: number,
}
export type AddOrder = {
    type: typeof ADD_ORDER
    orderData: {
        items: OrderItem[]
        amount: number
    }

}

export type ORDER_ACTIONS = AddOrder

/* Reducer */

export type ORDER_STATE = {
    orders: Order[]
}
