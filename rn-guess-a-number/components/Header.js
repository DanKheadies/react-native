import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
    return (
        <View style={{
            ...styles.header, 
            ...Platform.select({
                ios: styles.headerIOS, 
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        // height: 90,
        height: Dimensions.get('window').height > 600 ? 90 : 75,
        // paddingTop: 36,
        paddingTop: Dimensions.get('window').height > 600 ? 36 : 
            Platform.OS === 'android' ? 24 : 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: Colors.background,
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.background,
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.secondary : 'black'
    }
});

export default Header;