import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

const ShopScreen = () => {
    return (
        <View>
            <Text>Shop</Text>
        </View>
    );
};

ShopScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Shop',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default ShopScreen;