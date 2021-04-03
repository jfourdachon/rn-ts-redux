import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { ROOT_STATE } from '../store/combineReducers'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'

const MyStack = createStackNavigator()

const AppNavigator = () => {
    const isAuth = useSelector((state: ROOT_STATE) => !!state.auth.token)

    return (
        <NavigationContainer>
            <MyStack.Navigator>
                <MyStack.Screen name="ProductsOverview" component={ProductsOverviewScreen} />
            </MyStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator