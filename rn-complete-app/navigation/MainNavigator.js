import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/HomeScreen';

import DeviceColors from '../constants/DeviceColors';
import GoalColors from '../constants/GoalColors';
import GuessColors from '../constants/GuessColors';
import NavigationColors from '../constants/NavigationColors';
import NotificationsColors from '../constants/NotificationColors';
import ShopColors from '../constants/ShopColors';

const getColor = appStack => {
    return (
        appStack === 'device' ? DeviceColors.primary :
        appStack === 'goal' ? GoalColors.primary :
        appStack === 'guess' ? GuessColors.primary :
        appStack === 'navigation' ? NavigationColors.primary :
        appStack === 'notifications' ? NotificationsColors.primary :
        appStack === 'shop' ? ShopColors.primary :
            'black'
    );
};

export const defaultNavOptions = app => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? getColor(app) : 'white'
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : getColor(app)
    };
};

const AppStackNavigator = createStackNavigator();

export const AppNavigator = () => {
    return (
        <AppStackNavigator.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans'
            },
            headerTintColor: 'black'
        }}>
            <AppStackNavigator.Screen 
                component={HomeScreen}
                name='AppSelect'
                options={homeScreenOptions}
            />
        </AppStackNavigator.Navigator>
    );
};