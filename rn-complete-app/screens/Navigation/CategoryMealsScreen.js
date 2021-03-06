import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../../data/Navigation/dummy-data';
import DefaultText from '../../components/UI/DefaultText';
import MealList from '../../components/Navigation/MealList';

const CategoryMealScreen = props => {
    const catId = props.route.params.categoryId;

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        );
    }
    
    return (
        <MealList 
            listData={displayedMeals} 
            navigation={props.navigation} 
        />
    );
};

export const screenOptions = navData => {
    const catId = navData.route.params.categoryId;
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;