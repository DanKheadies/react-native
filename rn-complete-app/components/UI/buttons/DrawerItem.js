import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DeviceColors from '../../../constants/DeviceColors';
import GoalColors from '../../../constants/GoalColors';
import GuessColors from '../../../constants/GuessColors';
import NavigationColors from '../../../constants/NavigationColors';
import NotificationColors from '../../../constants/NotificationColors';
import ShopColors from '../../../constants/ShopColors';
import SpeechColors from '../../../constants/SpeechColors';

const getColor = color => {
    return (
        color === 'device' ? DeviceColors.primary : 
        color === 'goal' ? GoalColors.primary :
        color === 'guess' ? GuessColors.primary :
        color === 'navigation' ? NavigationColors.primary : 
        color === 'notifications' ? NotificationColors.primary :
        color === 'shop' ? ShopColors.primary :
        color === 'speech' ? SpeechColors.primary :
            'black'
    );
};

const DrawerItem = props => {
    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={{ ...styles.button, ...props.style }}
        >
            <Ionicons 
                color={getColor(props.color)}
                name={props.iconName}
                size={23}
            />
            <Text 
                style={{
                    ...styles.text,
                    color: getColor(props.color)
                }}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: Platform.OS === 'android' ? 2 : 0,
        marginTop: Platform.OS === 'android' ? 30 : 10,
        paddingHorizontal: 6,
        paddingVertical: 12
    },
    text: {
        fontSize: 14,
        paddingLeft: Platform.OS === 'android' ? 32 : 28,
        paddingTop: 4
    },
});

export default DrawerItem;