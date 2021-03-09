import {createDrawerNavigator} from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'

import Colors from '../constants/Colors'
import {ProductsStackNavigator, OrdersStackNavigator} from './ShopStackNavigator'

const ShopNavigator = createDrawerNavigator({
    Products: ProductsStackNavigator,
    Orders: OrdersStackNavigator
},{
    contentOptions: {
        activeTintColor: Colors.primary
    }
}) 

export default createAppContainer(ShopNavigator)