import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './MainNavigator';
import GoalScreen, { screenOptions as goalScreenOptions } from '../screens/GoalMaker/GoalScreen';

const GoalStackNavigator = createStackNavigator();

export const GoalNavigator = () => {
    return (
        <GoalStackNavigator.Navigator screenOptions={defaultNavOptions('goal')}>
            <GoalStackNavigator.Screen 
                component={GoalScreen}
                name='Goals'
                options={goalScreenOptions}
            />
        </GoalStackNavigator.Navigator>
    );
};