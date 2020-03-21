import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game...</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input 
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                blurOnSubmit 
                                keyboardType="number-pad" 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                placeholder="##" 
                                style={styles.numberInput} 
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{...styles.button, width: buttonWidth}}>
                                    <Button 
                                        color={Colors.secondary} 
                                        onPress={resetInputHandler} 
                                        title="Reset" 
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button 
                                        color={Colors.primary} 
                                        onPress={confirmInputHandler}
                                        title="Confirm" 
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: { 
        // width: 100
        // width: Dimensions.get('window').width / 4
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    numberInput: {
        width: 50,
        textAlign: 'center',
        marginBottom: 15
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        marginVertical: Dimensions.get('window').height > 600 ? 20 : 10,
    }
});

export default StartGameScreen;