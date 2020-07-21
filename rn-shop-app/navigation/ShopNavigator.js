import React from 'react';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
// import { createStackNavigator } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as authActions from '../store/actions/auth';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screscreenOptions as productDetailScreenOptionsenOptions } from '../screens/shop/ProductDetailScreen';
import StartupScreen from '../screens/StartupScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';

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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen 
                component={ProductsOverviewScreen}
                name="ProductsOverview"
                options={productsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                component={ProductDetailScreen}
                name="ProductDetail"
                options={productDetailScreenOptionsenOptions}
            />
            <ProductsStackNavigator.Screen 
                component={CartScreen}
                name="Cart"
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};

// const ProductsNavigator = createStackNavigator(
//     {
//         ProductsOverview: ProductsOverviewScreen,
//         ProductDetail: ProductDetailScreen,
//         Cart: CartScreen
//     }, 
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Ionicons 
//                     color={drawerConfig.tintColor}
//                     name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
//                     size={23}
//                 />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen 
                component={OrdersScreen}
                name="Orders"
                options={ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};

// const OrdersNavigator = createStackNavigator(
//     {
//         Orders: OrdersScreen
//     }, 
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Ionicons 
//                     color={drawerConfig.tintColor}
//                     name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
//                     size={23}
//                 />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen 
                component={UserProductsScreen}
                name="UserProducts"
                options={userProductsScreenOptions}
            />
            <AdminStackNavigator.Screen 
                component={EditProductScreen}
                name="EditProduct"
                options={editProductScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    );
};

// const AdminNavigator = createStackNavigator(
//     {
//         UserProducts: UserProductsScreen,
//         EditProduct: EditProductScreen
//     }, 
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => (
//                 <Ionicons 
//                     color={drawerConfig.tintColor}
//                     name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
//                     size={23}
//                 />
//             )
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

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
                            <DrawerItemList {...props} />
                            <View style={{padding: 20}}>
                                <Button 
                                    color={Colors.primary}
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
                activeTintColor: Colors.primary
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

// const ShopNavigator = createDrawerNavigator(
//     {
//         Products: ProductsNavigator,
//         Orders: OrdersNavigator,
//         Admin: AdminNavigator
//     }, 
//     {
//         contentOptions: {
//             activeTintColor: Colors.primary
//         },
//         contentComponent: props => {
//             const dispatch = useDispatch();
//             return (
//                 <View style={{flex: 1}}>
//                     <SafeAreaView
//                         forceInset={{
//                             horizontal: 'never',
//                             top: 'always'
//                         }}
//                     >
//                         <DrawerNavigatorItems {...props} />
//                         <View style={{padding: 20}}>
//                             <Button 
//                                 color={Colors.primary}
//                                 onPress={() => {
//                                     dispatch(authActions.logout());
//                                     // props.navigation.navigate('Auth');
//                                 }}
//                                 title="Logout"
//                             />
//                         </View>
//                     </SafeAreaView>
//                 </View>
//             );
//         }
//     }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen 
                component={AuthScreen}
                name="Auth"
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};

// const AuthNavigator = createStackNavigator(
//     {
//         Auth: AuthScreen
//     },
//     {
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);