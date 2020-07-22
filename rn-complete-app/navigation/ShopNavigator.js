import React from 'react';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as appActions from '../store/actions/App/app';
import { defaultNavOptions } from './MainNavigator';
import DrawerItem from '../components/UI/buttons/DrawerItem';

import * as authActions from '../store/actions/Shop/auth';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/Shop/user/AuthScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/Shop/shop/CartScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/Shop/user/EditProductScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/Shop/shop/OrdersScreen';
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from '../screens/Shop/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/Shop/shop/ProductDetailScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/Shop/user/UserProductsScreen';

import ShopColors from '../constants/ShopColors';

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions('shop')}>
            <ProductsStackNavigator.Screen 
                component={ProductsOverviewScreen}
                name='ProductsOverview'
                options={productsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                component={ProductDetailScreen}
                name='ProductDetail'
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                component={CartScreen}
                name='Cart'
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions('shop')}>
            <OrdersStackNavigator.Screen 
                component={OrdersScreen}
                name='Orders'
                options={ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};


const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions('shop')}>
            <AdminStackNavigator.Screen 
                component={UserProductsScreen}
                name='UserProducts'
                options={userProductsScreenOptions}
            />
            <AdminStackNavigator.Screen 
                component={EditProductScreen}
                name='EditProduct'
                options={editProductScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions('shop')}>
            <AuthStackNavigator.Screen 
                component={AuthScreen}
                name='Auth'
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopDrawer = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator 
            drawerContent={props => {
                return (
                    <View style={{flex: 1}}>
                        <SafeAreaView
                            forceInset={{
                                horizontal: 'never',
                                top: 'always'
                            }}
                        >
                            <DrawerItem 
                                color='shop'
                                iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                                onPress={() => {
                                    dispatch(appActions.selectNavigator('home'));
                                }}
                                text='Back to Apps'
                            />
                            <DrawerItemList {...props} />
                            <View style={{padding: 20}}>
                                <Button 
                                    color={ShopColors.primary}
                                    onPress={() => {
                                        dispatch(authActions.logout());
                                        // props.navigation.navigate('Auth');
                                    }}
                                    title="Logout"
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: ShopColors.primary
            }}
        >
            <ShopDrawerNavigator.Screen 
                component={ProductsNavigator}
                name="Products"
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            color={props.color}
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                            size={23}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                component={OrdersNavigator}
                name="Orders"
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            color={props.color}
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                            size={23}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen 
                component={AdminNavigator}
                name="Admin"
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            color={props.color}
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                            size={23}
                        />
                    )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};