import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/Landing/LandingScreen';
import AuthScreen from '../screens/user/AuthScreen';
import { defaultNavigationOptions } from './ShopStackNavigator';

const AuthStacknavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStacknavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStacknavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={{
          headerTitle: 'Authenticate',
        }}
      />
    </AuthStacknavigator.Navigator>
  );
};


const LandingStacknavigator = createStackNavigator();

export const LandingNavigator = () => {
  return (
    <LandingStacknavigator.Navigator screenOptions={defaultNavigationOptions}>
      <LandingStacknavigator.Screen
        name='Landing'
        component={LandingScreen}
      />
    </LandingStacknavigator.Navigator>
  );
};

