import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/combineReducers';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'
import AppNavigator from './navigation/AppNavigator';
import * as Notifications  from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: false,
        shouldShowAlert: true,
        shouldSetBadge: true,
      };
    },
  });
  

// composeWithDevTools only for development !!!!!!!!!!!!!!!!!!
// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log({ err })}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
