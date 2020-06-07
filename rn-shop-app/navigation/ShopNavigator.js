import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    color={drawerConfig.tintColor}
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    size={23}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    color={drawerConfig.tintColor}
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                    size={23}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(ShopNavigator);