import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { init } from './helpers/db';
import MainNavigator from './navigation/MainNavigator';

import authReducer from './store/reducers/Shop/auth';
import cartReducer from './store/reducers/Shop/cart';
import mealsReducer from './store/reducers/Navigation/meals';
import ordersReducer from './store/reducers/Shop/orders';
import placesReducer from './store/reducers/DeviceFeatures/places';
import productsReducer from './store/reducers/Shop/products';
import userReducer from './store/reducers/Shop/users';

init().then(() => {
  console.log('Initialized database.');
}).catch(err => {
  console.log('Initializing db failed.');
  console.log(err);
});

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  meals: mealsReducer,
  orders: ordersReducer,
  places: placesReducer,
  products: productsReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)} 
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
