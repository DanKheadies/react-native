import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as appActions from '../store/actions/App/app';
import { defaultNavOptions } from './MainNavigator';
import DrawerItem from '../components/UI/buttons/DrawerItem';

import CategoryMealsScreen, { screenOptions as categoryMealScreenOptions } from '../screens/Navigation/CategoryMealsScreen';
import FavoritesScreen, { screenOptions as favoritesScreenOptions } from '../screens/Navigation/FavoritesScreen';
import FiltersScreen, { screenOptions as filtersScreenOptions } from '../screens/Navigation/FiltersScreen';
import MealDetailScreen, { screenOptions as mealDetailScreenOptions } from '../screens/Navigation/MealDetailScreen';
import NavigationScreen, { screenOptions as navigationScreenOptions } from '../screens/Navigation/NavigationScreen';

import NavigationColors from '../constants/NavigationColors';

const MealsStackNavigator = createStackNavigator();

const MealsNavigator = () => {
    return (
        <MealsStackNavigator.Navigator screenOptions={defaultNavOptions('navigation')}>
            <MealsStackNavigator.Screen
                component={NavigationScreen}
                name='Categories'
                options={navigationScreenOptions}
            />
            <MealsStackNavigator.Screen
                component={CategoryMealsScreen}
                name='CategoryMeals'
                options={categoryMealScreenOptions}
            />
            <MealsStackNavigator.Screen 
                component={MealDetailScreen}
                name='MealDetail'
                options={mealDetailScreenOptions}
            />
        </MealsStackNavigator.Navigator>
    );
};

const FavStackNavigator = createStackNavigator();

const FavNavigator = () => {
    return (
        <FavStackNavigator.Navigator screenOptions={defaultNavOptions('navigation')}>
            <FavStackNavigator.Screen 
                component={FavoritesScreen}
                name='Favorites'
                options={favoritesScreenOptions}
            />
            <FavStackNavigator.Screen 
                component={MealDetailScreen}
                name='MealDetail'
                options={mealDetailScreenOptions}
            />
        </FavStackNavigator.Navigator>
    );
};

const MealsTabNavigator = createBottomTabNavigator();

const MealsTab = () => {
    return (
        <MealsTabNavigator.Navigator
            initialRouteName='Meals'
            tabBarOptions={{
                activeTintColor: NavigationColors.accent
            }}
        >
            <MealsTabNavigator.Screen 
                component={MealsNavigator}
                name='Meals'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-restaurant" color={color} size={size} />
                    ),
                    tabBarLabel: 'Meals'
                }}
            />
            <MealsTabNavigator.Screen 
                component={FavNavigator}
                name='Favorites'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-star" color={color} size={size} />
                    ),
                    tabBarLabel: 'Favorites!'
                }}
            />
        </MealsTabNavigator.Navigator>
    );
};

const MealsTabMaterialNavigator = createMaterialBottomTabNavigator();

const MealsTabMaterial = () => {
    return (
        <MealsTabMaterialNavigator.Navigator
            initialRouteName='Meals'
            activeColor={NavigationColors.white}
            inactiveColor={NavigationColors.grey}
            barStyle={{ backgroundColor: NavigationColors.primary }}
        >
            <MealsTabNavigator.Screen 
                component={MealsNavigator}
                name='Meals'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-restaurant" color={color} size={23} />
                      ),
                    tabBarLabel: 'Meals'
                }}
            />
            <MealsTabNavigator.Screen 
                component={FavNavigator}
                name='Favorites'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-star" color={color} size={23} />
                      ),
                    tabBarLabel: 'Favorites!'
                }}
            />
        </MealsTabMaterialNavigator.Navigator>
    );
};

const FiltersStackNavigator = createStackNavigator();

const FiltersNavigator = () => {
    return (
        <FiltersStackNavigator.Navigator screenOptions={defaultNavOptions('navigation')}>
            <FiltersStackNavigator.Screen 
                component={FiltersScreen}
                name='Filters'
                options={filtersScreenOptions}
            />
        </FiltersStackNavigator.Navigator>
    );
};

const MealsDrawerNavigator = createDrawerNavigator();

export const MealsDrawer = () => {
    const dispatch = useDispatch();

    return (
        <MealsDrawerNavigator.Navigator
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
                                color='navigation'
                                iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                                onPress={() => {
                                    dispatch(appActions.selectNavigator('home'));
                                }}
                                text='Back to Apps'
                            />
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: NavigationColors.primary
            }}
        >
            <MealsDrawerNavigator.Screen 
                component={Platform.OS === 'android' ?
                    MealsTabMaterial : MealsTab
                }
                name='Meals'
            />
            <MealsDrawerNavigator.Screen 
                component={FiltersNavigator}
                name='Filters'
            />
        </MealsDrawerNavigator.Navigator>
    );
};