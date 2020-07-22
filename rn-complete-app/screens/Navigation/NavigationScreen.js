import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../../data/Navigation/dummy-data';
import CategoryGridTile from '../../components/Navigation/CategoryGridTile';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

const NavigationScreen = props => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile 
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate('CategoryMeals', { 
                        categoryId: itemData.item.id
                    });
                }} 
                title={itemData.item.title} 
            />
        );
    };

    return (
         <FlatList 
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} 
        />
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='navigation'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default NavigationScreen;