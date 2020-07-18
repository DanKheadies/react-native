import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MainNavigator from './navigation/MainNavigator';
import mealsReducer from './store/reducers/Navigation/meals';

import authReducer from './store/reducers/Shop/auth';
import cartReducer from './store/reducers/Shop/cart';
import ordersReducer from './store/reducers/Shop/orders';
import productsReducer from './store/reducers/Shop/products';
import userReducer from './store/reducers/Shop/users';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  meals: mealsReducer,
  orders: ordersReducer,
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
