import { Platform } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Colors from '../constants/Colors'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'

const ProductsStackNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
        },
    }
})

export default createAppContainer(ProductsStackNavigator)