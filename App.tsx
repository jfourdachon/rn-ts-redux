import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider, useStore } from 'react-redux';
import rootReducer from './store/combineReducers';
import ShopStackNavigator from './navigation/ShopStackNavigator';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

const store = createStore(rootReducer);


const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
  };
export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={(err) => console.log({err})} />
}
  return (
    <Provider store={store}>
      <ShopStackNavigator />
    </Provider>
  );
}

