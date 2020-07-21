import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator
                color={Colors.primary}
                size='large'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default StartupScreen;