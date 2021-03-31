import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from '../screens/Landing/LandingScreen';
import AuthScreen from '../screens/user/AuthScreen';
import {ShopNavigator} from './ShopDrawerNavigator'
import { defaultNavigationOptions } from './ShopStackNavigator';

const AuthStackNavigator = createStackNavigator({
    Auth: AuthScreen
}, {defaultNavigationOptions})

const MainNavigator = createSwitchNavigator({
    Landing: LandingScreen,
    Auth: AuthStackNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)