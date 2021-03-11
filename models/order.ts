import { OrderItem } from "../store/actions/order.actions"
import moment from 'moment'
import 'moment/locale/fr' 

class Order {

    id: string
    items: OrderItem[]
    totalAMount: number
    date: Date

    constructor(id: string, items: OrderItem[], totalAmount: number, date: Date) {
        this.id = id
        this.items = items
        this.totalAMount = totalAmount
        this.date = date
    }

    get readableDate(): string {
        // classic way
        // return this.date.toLocaleDateString('fr-FR', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })

        //with moment
        moment.locale('fr')
        return  moment(this.date).format('llll');
    }
}

export default Order