import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import * as appActions from '../../store/actions/App/app';
import DefaultButton from '../../components/UI/buttons/DefaultButton';
import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
        shouldShowAlert: true,
        // shouldPlaySound: false // not working?
        };
    }
});

const NotificationsScreen = () => {
    const [pushToken, setPushToken] = useState();

    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then(statusObj => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj;
        })
        .then(statusObj => {
            if (statusObj.status !== 'granted') {
            // Send an alert saying sorry, can't send notifications
                throw new Error('Permission not granted!');
            }
        })
        .then(() => {
            return Notifications.getExpoPushTokenAsync();
        })
        .then(response => {
            const token = response.data;
            setPushToken(token);
        })
        .catch(err => {
            return null;
        });
    }, []);

    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
        };
    }, []);

    const triggerInstantLocalNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Instant Local Notification',
                body: 'This is an instantaneous, local notification.',
            },
            trigger: null
        });
    };

    const triggerInstantPushNotificationHandler = () => {
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: pushToken,
                data: { 
                    extraData: 'Some data.' 
                },
                title: 'Expo Push Notification',
                body: 'This is an instantenous, push notification.'
            })
        });
    };

    const trigger3sNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: '3s Local Notification',
                body: 'This is a 3s delayed, local notification.',
            },
            trigger: {
                seconds: 3
            }
        });
    };

    const trigger10sNotificationHandler = () => {
        setTimeout(() => {
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: pushToken,
                    data: { 
                        extraData: 'Some data.' 
                    },
                    title: 'Expo 10s Push Notification',
                    body: 'This is a 10s delayed, push notification.'
                })
            });
        }, 10000);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <DefaultButton
                    color={'notifications'}
                    onPress={triggerInstantLocalNotificationHandler} 
                    title="Trigger Instant Notification" 
                />
                <View style={styles.textContainer}>
                    <DefaultText>
                    Send an instantaneous notification through a local channel.
                    </DefaultText>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <DefaultButton
                    color={'notifications'}
                    onPress={triggerInstantPushNotificationHandler} 
                    title="Trigger Instant Notification" 
                />
                <View style={styles.textContainer}>
                    <DefaultText>
                        Send an instantaneous notification through expo's servers, i.e. an instantaneous Push Notification.
                    </DefaultText>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <DefaultButton
                    color={'notifications'}
                    onPress={trigger3sNotificationHandler} 
                    title="Trigger 3s Notification" 
                />
                <View style={styles.textContainer}>
                    <DefaultText>
                        Send an 3-second delayed notification through a local channel. The app can be open or closed.
                    </DefaultText>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <DefaultButton
                    color={'notifications'}
                    onPress={trigger10sNotificationHandler} 
                    title="Trigger 10s Notification" 
                />
                <View style={styles.textContainer}>
                    <DefaultText>
                        Send a 10-second delayed notification through expo's servers, i.e. a delayed Push Notification.  The app can be open or closed.
                    </DefaultText>
                </View>
            </View>
        </View>
    );
}

export const screenOptions = navData => {
    const dispatch = useDispatch();

    return {
        headerTitle: 'Notifications',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='notifications'
                    iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                    onPress={() => {
                        dispatch(appActions.selectNavigator('home'));
                    }}
                    text='Apps'
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%'
    },
    screen: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 50
    },
    textContainer: {
        paddingTop: 5
    }
});

export default NotificationsScreen;