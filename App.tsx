import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/combineReducers';
import ShopStackNavigator from './navigation/ShopStackNavigator';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopStackNavigator />
    </Provider>
  );
}

