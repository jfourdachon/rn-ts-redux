import {createDrawerNavigator} from 'react-navigation-drawer'

import Colors from '../constants/Colors'
import {ProductsStackNavigator, OrdersStackNavigator, AdminStackNavigator} from './ShopStackNavigator'

export const ShopNavigator = createDrawerNavigator({
    Products: ProductsStackNavigator,
    Orders: OrdersStackNavigator,
    Admin: AdminStackNavigator
},{
    contentOptions: {
        activeTintColor: Colors.primary
    }
}) 

