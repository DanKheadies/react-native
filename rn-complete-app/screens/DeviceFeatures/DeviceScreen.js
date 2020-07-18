import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

const DeviceScreen = () => {
    return (
        <View>
            <Text>Device</Text>
        </View>
    );
};

DeviceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Device',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='device'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                    title='Menu'
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default DeviceScreen;