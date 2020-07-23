import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './MainNavigator';
import NotificationsScreen, { screenOptions as notificationsScreenOptions } from '../screens/Notifications/NotificationsScreen';

const NotificationsStackNavigator = createStackNavigator();

export const NotificationsNavigator = () => {
    return (
        <NotificationsStackNavigator.Navigator screenOptions={defaultNavOptions('notifications')}>
            <NotificationsStackNavigator.Screen 
                component={NotificationsScreen}
                name='Notifications'
                options={notificationsScreenOptions}
            />
        </NotificationsStackNavigator.Navigator>
    );
};