import Order from "../../models/order"
import { ADD_ORDER, ORDER_ACTIONS } from "../actions/order.actions"

export type ORDER_STATE = {
    orders: Order[]
}

const initialState: ORDER_STATE = {
    orders: []
}

export default (state = initialState, action: ORDER_ACTIONS) => {
    switch (action.type) {

    case ADD_ORDER:
        const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date())
        return {...state, orders: state.orders.concat(newOrder)}

    default:
        return state
    }
}
