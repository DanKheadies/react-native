import React, { useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import DefaultButton from '../../components/UI/buttons/DefaultButton';
import GoalInput from '../../components/GoalMaker/GoalInput';
import GoalItem from '../../components/GoalMaker/GoalItem';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';

const GoalScreen = () => {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = goalTitle => {
        setCourseGoals(currentGoals => [
            ...currentGoals,
            {
                id: Math.random().toString(),
                value: goalTitle
            }
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter(goal => goal.id !== goalId);
        });
    };

    const cancelGoalHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <DefaultButton
                color={'goal'}
                onPress={() => setIsAddMode(true)} 
                title="Add New Goal" 
            />
            <GoalInput 
                onAddGoal={addGoalHandler} 
                onCancel={cancelGoalHandler} 
                visible={isAddMode} 
            />
            <FlatList
                data={courseGoals}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <GoalItem 
                        id={itemData.item.id} 
                        onDelete={removeGoalHandler} 
                        title={itemData.item.value} 
                    />
                )} 
            />
        </View>
    );
}

GoalScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Goals',
        // headerLeft: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <HeaderItem 
        //             color='goal'
        //             iconName={Platform.OS === 'android' ? 'md-arrow-round-back' : 'ios-arrow-round-back'} 
        //             onPress={() => {
        //                 navData.navigation.goBack();
        //             }} 
        //             title="Back" 
        //         />
        //     </HeaderButtons>
        // )
    };
};

const styles = StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    screen: {
        padding: 50
    }
});

export default GoalScreen;