import React from 'react';
import { Button } from 'react-native';

import DeviceColors from '../../../constants/DeviceColors';
import GoalColors from '../../../constants/GoalColors';
import GuessColors from '../../../constants/GuessColors';
import NavigationColors from '../../../constants/NavigationColors';
import ShopColors from '../../../constants/ShopColors';

const DefaultButton = props => {
    return (
        // <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
        //     <View style={{ ...styles.button, ...props.style }}>
        //         <Text style={{ ...styles.buttonText, ...props.textStyling }}>
        //             {props.text}
        //         </Text>
        //     </View>
        // </TouchableOpacity>
        <Button 
            color={
                props.color === 'device' ? DeviceColors.primary : 
                props.color === 'goal' ? GoalColors.primary :
                props.color === 'guess' ? GuessColors.primary : 
                props.color === 'navigation' ? NavigationColors.primary : 
                props.color === 'shop' ? ShopColors.primary :
                    'black'
            }
            onPress={props.onPress}
            title={props.title}
        />
    );
};

export default DefaultButton;