import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';

import Colors from '../../constants/GoalColors';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    };

    const cancelGoalHandler = () => {
        props.onCancel();
        setEnteredGoal('');
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={goalInputHandler}
                    placeholder="Course Goal"
                    style={styles.input}
                    value={enteredGoal} 
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            color="red"
                            onPress={cancelGoalHandler}
                            title="CANCEL" />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={addGoalHandler}
                            title="ADD" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '40%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    inputContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '80%'
    }
});

export default GoalInput;