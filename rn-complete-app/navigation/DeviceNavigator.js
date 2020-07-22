import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './MainNavigator';
import DeviceScreen, { screenOptions as deviceScreenOptions } from '../screens/DeviceFeatures/DeviceScreen';
import MapScreen from '../screens/DeviceFeatures/MapScreen';
import NewPlaceScreen, { screenOptions as newPlaceScreenOptions } from '../screens/DeviceFeatures/NewPlaceScreen';
import PlacesDetailScreen, { screenOptions as placesDetailScreenOptions } from '../screens/DeviceFeatures/PlacesDetailScreen';

const DeviceStackNavigator = createStackNavigator();

export const DeviceNavigator = () => {
    return (
        <DeviceStackNavigator.Navigator screenOptions={defaultNavOptions('device')}>
            <DeviceStackNavigator.Screen 
                component={DeviceScreen}
                name='Device'
                options={deviceScreenOptions}
            />
            <DeviceStackNavigator.Screen 
                component={PlacesDetailScreen}
                name='PlacesDetail'
                options={placesDetailScreenOptions}
            />
            <DeviceStackNavigator.Screen 
                component={NewPlaceScreen}
                name='NewPlace'
                options={newPlaceScreenOptions}
            />
            <DeviceStackNavigator.Screen 
                component={MapScreen}
                name='Map'
            />
        </DeviceStackNavigator.Navigator>
    );
};