import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './MainNavigator';
import GuessScreen, { screenOptions as guessScreenOptions } from '../screens/GuessNumber/GuessScreen';

const GuessStackNavigator = createStackNavigator();

export const GuessNavigator = () => {
    return (
        <GuessStackNavigator.Navigator screenOptions={defaultNavOptions('guess')}>
            <GuessStackNavigator.Screen 
                component={GuessScreen}
                name='Guess'
                options={guessScreenOptions}
            />
        </GuessStackNavigator.Navigator>
    );
};