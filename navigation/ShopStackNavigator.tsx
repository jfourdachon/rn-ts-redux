import React from 'react'

import { Platform } from 'react-native'
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack'
import Colors from '../constants/Colors'
import {Ionicons} from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import { NavigationDrawerOptions } from 'react-navigation-drawer'
import { NavigationBottomTabOptions } from 'react-navigation-tabs'

const defaultNavigationOptions = {
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

export const ProductsStackNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen
}, { navigationOptions: {
    drawerIcon: (drawerConfig: any) => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
},
    defaultNavigationOptions
})

export const OrdersStackNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig: any) => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions })

