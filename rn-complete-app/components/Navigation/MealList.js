import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

        return (
            <MealItem 
                affordability={itemData.item.affordability}
                complexity={itemData.item.complexity}
                duration={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', { 
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite
                    });
                }} 
                title={itemData.item.title} 
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList 
                data={props.listData}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 15
    }
});

export default MealList;