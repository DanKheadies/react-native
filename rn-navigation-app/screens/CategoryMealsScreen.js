import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealScreen = props => {
    const renderMealItem = itemData => {
        return (
            <MealItem 
                title={itemData.item.title} 
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({ 
                        routeName: 'MealDetail', 
                        params: {
                            mealId: itemData.item.id
                        } 
                    });
                }} 
            />
        );
    };

    const catId = props.navigation.getParam('categoryId');
    // const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
    
    return (
        <View style={styles.screen}>
            <FlatList 
                data={displayedMeals}
                // keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
            {/* <Text>The Category Meals Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button 
                title="Go to Details" 
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail'
                    });
                }} 
            />
            <Button title="Go Back" onPress={() => {
                // props.navigation.goBack();
                props.navigation.pop();
            }} /> */}
        </View>
    );
};

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 15
    }
});

export default CategoryMealScreen;