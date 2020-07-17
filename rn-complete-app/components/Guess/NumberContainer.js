import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/GuessColors';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>
                {props.children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.secondary,
        fontSize: 22
    }
});

export default NumberContainer;