import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ROOT_STATE } from '../store/combineReducers';
import { ShopNavigator } from './ShopDrawerNavigator';
import { AuthNavigator, LandingNavigator } from './MainNavigator';

const AppNavigator = () => {
  const isAuth = useSelector((state: ROOT_STATE) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state: ROOT_STATE) => !!state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <LandingNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
