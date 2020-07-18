import React from 'react';
import { Button, Platform, SafeAreaView, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Permissions from '../components/UI/Permissions';

import GoalScreen from '../screens/GoalMaker/GoalScreen';
import GuessScreen from '../screens/GuessNumber/GuessScreen';
import HomeScreen from '../screens/HomeScreen';

import CategoryMealsScreen from '../screens/Navigation/CategoryMealsScreen';
import FavoritesScreen from '../screens/Navigation/FavoritesScreen';
import FiltersScreen from '../screens/Navigation/FiltersScreen';
import MealDetailScreen from '../screens/Navigation/MealDetailScreen';
import NavigationScreen from '../screens/Navigation/NavigationScreen';

import * as authActions from '../store/actions/Shop/auth';
import AuthScreen from '../screens/Shop/user/AuthScreen';
import CartScreen from '../screens/Shop/shop/CartScreen';
import EditProductScreen from '../screens/Shop/user/EditProductScreen';
import OrdersScreen from '../screens/Shop/shop/OrdersScreen';
import ProductsOverviewScreen from '../screens/Shop/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/Shop/shop/ProductDetailScreen';
import ShopScreen from '../screens/Shop/ShopScreen';
import UserProductsScreen from '../screens/Shop/user/UserProductsScreen';

import DeviceScreen from '../screens/DeviceFeatures/DeviceScreen';
import MapScreen from '../screens/DeviceFeatures/MapScreen';
import NewPlaceScreen from '../screens/DeviceFeatures/NewPlaceScreen';
import PlacesDetailScreen from '../screens/DeviceFeatures/PlacesDetailScreen';

import DeviceColors from '../constants/DeviceColors';
import GoalColors from '../constants/GoalColors';
import GuessColors from '../constants/GuessColors';
import NavigationColors from '../constants/NavigationColors';
import ShopColors from '../constants/ShopColors';

const defaultNavOptions = app => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 
                app === 'device' ? DeviceColors.primary :
                app === 'goal' ? GoalColors.primary :
                app === 'guess' ? GuessColors.primary :
                app === 'navigation' ? NavigationColors.primary :
                app === 'shop' ? ShopColors.primary :
                    'black' : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' :
            app === 'device' ? DeviceColors.primary :
            app === 'goal' ? GoalColors.primary :
            app === 'guess' ? GuessColors.primary :
            app === 'navigation' ? NavigationColors.primary :
            app === 'shop' ? ShopColors.primary :
                'black'
    };
};

const AppNavigator = createStackNavigator(
    {
        AppSelect: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: 'Apps'
            }
        },
    }, 
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    color={drawerConfig.tintColor}
                    name={Platform.OS === 'android' ? 'md-home' : 'ios-home'} 
                    size={23}
                />
            ),
            drawerLabel: 'Select an App'
        },
        defaultNavigationOptions: defaultNavOptions('derp')
    }
);

const GoalNavigator = createStackNavigator(
    {
        AppNav: {
            screen: AppNavigator,
            navigationOptions: {
                headerTitle: 'Apps'
            }
        },
        Goals: GoalScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions('goal')
    }
);

const GuessNavigator = createStackNavigator(
    {
        AppNav: {
            screen: AppNavigator,
            navigationOptions: {
                headerTitle: 'Apps'
            }
        },
        Guess: GuessScreen,
    }, 
    {
        defaultNavigationOptions: defaultNavOptions('guess')
    }
);

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: NavigationScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories'
            }
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: MealDetailScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions('navigation')
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions('navigation')
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarColor: NavigationColors.primary,
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarColor: NavigationColors.accent,
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarLabel: 'Favorites!'
        }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: NavigationColors.white,
        shifting: true
    }) 
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: NavigationColors.accent,
            labelStyle: {
                fontFamily: 'open-sans'
            }
        }
    }
);

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions('navigation')
    }
);

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
        defaultNavigationOptions: defaultNavOptions('shop')
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
        defaultNavigationOptions: defaultNavOptions('shop')
    }
);

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    }, 
    {
        navigationOptions: {
            // drawerIcon: drawerConfig => (
            //     <Ionicons 
            //         color={drawerConfig.tintColor}
            //         name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
            //         size={23}
            //     />
            // ),
            // drawerLabel: 'Admin',
            drawerIcon: () => null,
            drawerLabel: () => null,
            title: null
        },
        defaultNavigationOptions: defaultNavOptions('shop')
    }
);

const AuthNavigator = createStackNavigator(
    {
        AppNav: {
            screen: AppNavigator,
            navigationOptions: {
                headerTitle: 'Apps'
            }
        },
        Auth: AuthScreen,
        ProductsNavi: ProductsNavigator
    },
    {
        defaultNavigationOptions: defaultNavOptions('shop')
    }
);

const DeviceNavigator = createStackNavigator(
    {
        Device: DeviceScreen,
        PlacesDetail: PlacesDetailScreen,
        NewPlace: NewPlaceScreen,
        Map: MapScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'Device Features'
        },
        defaultNavigationOptions: defaultNavOptions('device')
    }
);

const MealsDrawer = createDrawerNavigator(
    {
        AppN: AppNavigator,
        MealsFav: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: NavigationColors.accent,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
);

const ShopDrawer = createDrawerNavigator(
    {
        AppN: AppNavigator,
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        AdminN: AdminNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: ShopColors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{flex: 1}}>
                    <SafeAreaView
                        forceInset={{
                            horizontal: 'never',
                            top: 'always'
                        }}
                    >
                        <DrawerNavigatorItems {...props} />
                        <Permissions onPress={() => props.navigation.navigate('UserProducts')} />
                        <View style={{padding: 20}}>
                            <Button 
                                color={ShopColors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    props.navigation.navigate('AppSelect');
                                }}
                                title="Logout"
                            />
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    }
);

const DeviceDrawer = createDrawerNavigator(
    {
        AppN: AppNavigator,
        DeviceN: DeviceNavigator
    },
    {
        contentOptions: {
            activeTintColor: DeviceColors.primary,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
);

const MasterNavigator = createSwitchNavigator(
    {
        Home: AppNavigator,
        MealsD: MealsDrawer,
        ShopD: ShopDrawer,
        DeviceD: DeviceDrawer,
        GoalNavi: GoalNavigator,
        GuessNavi: GuessNavigator,
        Startup: ShopScreen,
        AuthNavi: AuthNavigator,
        AdminNavi: AdminNavigator,
        DeviceNavi: DeviceNavigator
    }
);

export default createAppContainer(MasterNavigator);