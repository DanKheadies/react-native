import React from 'react';
import { Button } from 'react-native';

import DeviceColors from '../../../constants/DeviceColors';
import GoalColors from '../../../constants/GoalColors';
import GuessColors from '../../../constants/GuessColors';
import NavigationColors from '../../../constants/NavigationColors';
import NotificationsColors from '../../../constants/NotificationColors';
import ShopColors from '../../../constants/ShopColors';
import SpeechColors from '../../../constants/SpeechColors';

const DefaultButton = props => {
    return (
        <Button 
            color={
                props.color === 'device' ? DeviceColors.primary : 
                props.color === 'goal' ? GoalColors.primary :
                props.color === 'guess' ? GuessColors.primary : 
                props.color === 'navigation' ? NavigationColors.primary : 
                props.color === 'notifications' ? NotificationsColors.primary :
                props.color === 'shop' ? ShopColors.primary :
                props.color === 'speech' ? SpeechColors.primary :
                    'black'
            }
            onPress={props.onPress}
            title={props.title}
        />
    );
};

export default DefaultButton;