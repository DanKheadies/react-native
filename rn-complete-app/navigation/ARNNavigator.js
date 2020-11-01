import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './MainNavigator';
import { DeviceNavigator } from './DeviceNavigator';
import { GoalNavigator } from './GoalNavigator';
import { GuessNavigator } from './GuessNavigator';
import { MealsDrawer } from './MealsNavigator';
import { NotificationsNavigator } from './NotificationsNavigator';
import { AuthNavigator, ShopDrawer } from './ShopNavigator';
import ShopScreen from '../screens/Shop/ShopScreen';
import { SpeechNavigator } from './SpeechNavigator';

const ARNNavigator = () => {
    const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);
    const isAuth = useSelector(state => !!state.auth.token);
    const whichNavigator = useSelector(state => state.app.stack);

    return (
        <NavigationContainer>
            {whichNavigator === 'home' && <AppNavigator />}
            {whichNavigator === 'goals' && <GoalNavigator />}
            {whichNavigator === 'guess' && <GuessNavigator />}
            {whichNavigator === 'navigation' && <MealsDrawer />}
            {whichNavigator === 'shop' && isAuth && <ShopDrawer />}
            {whichNavigator === 'shop' && !isAuth && didTryAutoLogin && <AuthNavigator />}
            {whichNavigator === 'shop' && !isAuth && !didTryAutoLogin && <ShopScreen />}
            {whichNavigator === 'device' && <DeviceNavigator />}
            {whichNavigator === 'notifications' && <NotificationsNavigator />}
            {whichNavigator === 'speech' && <SpeechNavigator />}
        </NavigationContainer>
    );
};

export default ARNNavigator;