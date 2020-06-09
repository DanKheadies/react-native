import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';

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

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    color={drawerConfig.tintColor}
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
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
        Orders: OrdersNavigator,
        Admin: AdminNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(ShopNavigator);