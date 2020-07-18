import React from 'react';
import { Platform } from 'react-native';
import { Item } from 'react-navigation-header-buttons';

import DeviceColors from '../../constants/DeviceColors';
import GoalColors from '../../constants/GoalColors';
import GuessColors from '../../constants/GuessColors';
import NavigationColors from '../../constants/NavigationColors';
import ShopColors from '../../constants/ShopColors';

const HeaderItem = props => {
    return (
        <Item 
            color={
                Platform.OS === 'android' ? 'white' : 
                    props.color === 'device' ? DeviceColors.primary : 
                    props.color === 'navigation' ? NavigationColors.primary : 
                    props.color === 'shop' ? ShopColors.primary :
                        'black'
            }
            iconName={props.iconName} 
            onPress={props.onPress} 
            title={props.title} 
        />
    );
};

export default HeaderItem;