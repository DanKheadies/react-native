import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';
import MealList from '../../components/Navigation/MealList';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No favorite meals found. Start adding some!</DefaultText>
            </View>
        );
    }

    return (
        <MealList 
            listData={favMeals} 
            navigation={props.navigation} 
        />
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem title="Menu" iconName="ios-menu" onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;