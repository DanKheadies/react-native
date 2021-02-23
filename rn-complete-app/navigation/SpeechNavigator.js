import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './MainNavigator';
import SpeechScreen, { screenOptions as speechScreenOptions } from '../screens/Speech/SpeechScreen';

const SpeechStackNavigator = createStackNavigator();

export const SpeechNavigator = () => {
    return (
        <SpeechStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <SpeechStackNavigator.Screen 
                component={SpeechScreen}
                name='Speech'
                options={speechScreenOptions}
            />
        </SpeechStackNavigator.Navigator>
    );
};