import Order from "../../models/order"
import { ORDER_ACTIONS, ORDER_STATE } from "../../typescript/types/redux/order"
import { ADD_ORDER } from "../actions/order.actions"


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
