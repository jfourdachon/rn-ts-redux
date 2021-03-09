import { ROOT_STATE } from "../combineReducers"
import { ItemCart } from "../reducers/cart.reducer"

export const ADD_ORDER = 'ADD_ORDER'

export type OrderItem = {
    id: string
        productTitle: string
        productPrice: number,
        quantity: number,
        sum: number,
}
type AddOrder = {
    type: typeof ADD_ORDER
    orderData: {
        items: OrderItem[]
        amount: number
    }

}

export type ORDER_ACTIONS = AddOrder

export const adOrder = (cartItems: OrderItem[], totalAmount: number): AddOrder => {
    return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount } }
}