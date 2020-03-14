import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={goalInputHandler}
                placeholder="Course Goal"
                style={styles.input}
                value={enteredGoal} />
            <Button
                onPress={props.onAddGoal.bind(this, enteredGoal)}
                title="ADD" />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
        width: '80%'
    }
});

export default GoalInput;