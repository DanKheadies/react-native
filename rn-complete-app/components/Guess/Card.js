import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/GuessColors';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 6,
        backgroundColor: Colors.white,
        paddingVertical: 25,
        paddingHorizontal: 5,
        borderRadius: 10
    }
});

export default Card;