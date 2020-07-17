import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons';

import DeviceScreen from '../screens/DeviceFeatures/DeviceScreen';
import GoalScreen from '../screens/GoalMaker/GoalScreen';
import GuessScreen from '../screens/GuessNumber/GuessScreen';
import HomeScreen from '../screens/HomeScreen';
import NavigationScreen from '../screens/Navigation/NavigationScreen';
import ShopScreen from '../screens/Shop/ShopScreen';

// import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/Navigation/CategoryMealsScreen';
import MealDetailScreen from '../screens/Navigation/MealDetailScreen';
import FavoritesScreen from '../screens/Navigation/FavoritesScreen';
import FiltersScreen from '../screens/Navigation/FiltersScreen';

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

// const MealNavigator = createStackNavigator(
//     {
//         Navigate: NavigationScreen
//     },
//     {
//         navigationOptions: {
//             drawerLabel: 'Navigating Meals..'
//         },
//         defaultNavigationOptions: defaultNavOptions('navigation')
//     }
// );

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

const ShopNavigator = createStackNavigator(
    {
        Shop: ShopScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'Shopping..'
        },
        defaultNavigationOptions: defaultNavOptions('shop')
    }
);

const DeviceNavigator = createStackNavigator(
    {
        Device: DeviceScreen
    },
    {
        navigationOptions: {
            drawerLabel: 'Using Device Features..'
        },
        defaultNavigationOptions: defaultNavOptions('device')
    }
);

const MealsDrawer = createDrawerNavigator(
    {
        AppN: AppNavigator,
        // NavigationN: MealNavigator,
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
        ShopN: ShopNavigator,   
        Shop5: ShopScreen,  
        Shop6: ShopScreen,  
        Shop7: ShopScreen,
    }
);

const DeviceDrawer = createDrawerNavigator(
    {
        AppN: AppNavigator,
        DeviceN: DeviceNavigator,   
        Device5: DeviceScreen,  
        Device6: DeviceScreen,  
        Device7: DeviceScreen,
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
        // MealsNavi: MealNavigator,
        ShopNavi: ShopNavigator,
        DeviceNavi: DeviceNavigator
    }
);

export default createAppContainer(MasterNavigator);