import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient'

import * as authActions from '../../store/actions/auth';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [
                {
                    text: 'Okay'
                }
            ]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            // props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({ 
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                <LinearGradient
                    colors={['#ffedff', '#ffe3ff']}
                    style={styles.gradient}
                >
                    <Card style={styles.authContainer}>
                        <ScrollView>
                            <Input 
                                autoCapitalize="none"
                                email
                                errorText="Please enter a valid email address."
                                id="email"
                                initialValue=''
                                keyboardType="email-address"
                                label="E-Mail"
                                onInputChange={inputChangeHandler}
                                required
                            />
                            <Input 
                                autoCapitalize="none"
                                errorText="Please enter a valid password."
                                id="password"
                                initialValue=''
                                keyboardType="default"
                                label="Password"
                                minLength={5}
                                onInputChange={inputChangeHandler}
                                required
                                secureTextEntry
                            />
                            <View style={styles.button}>
                                {isLoading ? (
                                    <ActivityIndicator 
                                        color={Colors.primary}
                                        size='small'
                                    />
                                ) : (
                                    <Button
                                        color={Colors.primary}
                                        onPress={authHandler}
                                        title={isSignUp ? 'Sign Up' : 'Login'}
                                    />
                                )}
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color={Colors.accent}
                                    onPress={() => {
                                        setIsSignUp(prevState => !prevState);
                                    }}
                                    title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                                />
                            </View>
                        </ScrollView>
                    </Card>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export const screenOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    authContainer: {
        maxHeight: 400,
        maxWidth: 400,
        padding: 20,
        width: '80%'
    },
    button: {
        marginTop: 10
    },
    gradient: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        width: '100%'
    },
    screen: {
        flex: 1,
    }
});

export default AuthScreen;