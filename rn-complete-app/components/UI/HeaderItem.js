import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../../components/UI/DefaultText';
import DeviceColors from '../../constants/DeviceColors';
import GoalColors from '../../constants/GoalColors';
import GuessColors from '../../constants/GuessColors';
import NavigationColors from '../../constants/NavigationColors';
import NotificationColors from '../../constants/NotificationColors';
import ShopColors from '../../constants/ShopColors';

const getColor = color => {
    return (
        Platform.OS === 'android' ? 'white' : 
            color === 'device' ? DeviceColors.primary : 
            color === 'goal' ? GoalColors.primary :
            color === 'guess' ? GuessColors.primary :
            color === 'navigation' ? NavigationColors.primary : 
            color === 'notifications' ? NotificationColors.primary :
            color === 'shop' ? ShopColors.primary :
                'black'
    );
};

const HeaderItem = props => {
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
            {props.text && Platform.OS === 'ios' &&
                <DefaultText 
                    style={{
                        ...styles.text,
                        color: getColor(props.color)
                    }}
                >
                    {props.text}
                </DefaultText>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: Platform.OS === 'android' ? 20 : 10,
        paddingVertical: 8
    },
    text: {
        fontSize: 18,
        paddingLeft: 8
    },
});

export default HeaderItem;