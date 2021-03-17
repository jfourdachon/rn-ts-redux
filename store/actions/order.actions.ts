import { OrderItem, AddOrder } from "../../typescript/types/redux/order"

export const ADD_ORDER = 'ADD_ORDER'


export const addOrder = (cartItems: OrderItem[], totalAmount: number): AddOrder => {
    return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount } }
}