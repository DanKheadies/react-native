import React, { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

// import { toggleFavorite } from '../../store/actions/Navigation/meals';
import * as mealsActions from '../../store/actions/Navigation/meals';
import Colors from '../../constants/NavigationColors';
import DefaultText from '../../components/UI/DefaultText';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);

    const mealId = props.route.params.mealId;
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const isFavorite = props.route.params.isFav;
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(
        meal => meal.id === mealId
    ));
    
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(mealsActions.toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <HeaderItem 
                        color='navigation'
                        iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                        onPress={toggleFavoriteHandler} 
                    />
                </HeaderButtons>
            )
        });
    }, [toggleFavoriteHandler, isFavorite]);

    useEffect(() => {
        props.navigation.setParams({
            isFav: currentMealIsFavorite
        });
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

export const screenOptions = navData => {
    const mealTitle = navData.route.params.mealTitle;

    return {
        headerTitle: mealTitle,
        
    };
};

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: 200
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: Colors.grey,
        borderWidth: 1,
        padding: 10
    },
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    }
});

export default MealDetailScreen;