import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{
                text: 'Okay'
            }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong input!', 'Please check the errors in the form.', [
                    { text: 'Okay' }
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description
                ));
            } else {
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description,
                    +formState.inputValues.price
                ));
            }

            props.navigation.goBack();

        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);

    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        });
    }, [submitHandler]);

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

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    color={Colors.primary}
                    size='large'
                />
            </View>
        );
    }
    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input 
                        autoCapitalize='sentences'
                        autoCorrect
                        errorText='Please enter a valid title!'
                        id='title'
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        keyboardType='default'
                        label='Title'
                        onInputChange={inputChangeHandler}
                        required
                        returnKeyType='next'
                    />
                    <Input 
                        errorText='Please enter a valid image url!'
                        keyboardType='default'
                        id='imageUrl'
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        label='Image Url'
                        onInputChange={inputChangeHandler}
                        required
                        returnKeyType='next'
                    />
                    {editedProduct ? null : 
                        <Input 
                            errorText='Please enter a valid price!'
                            id='price'
                            keyboardType='decimal-pad'
                            label='Price'
                            min={0.01}
                            onInputChange={inputChangeHandler}
                            required
                            returnKeyType='next'
                        />
                    }
                    <Input 
                        autoCapitalize='sentences'
                        autoCorrect
                        errorText='Please enter a valid description!'
                        id='description'
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        keyboardType='default'
                        label='Description'
                        min={5}
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        required
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Save'
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    form: {
        margin: 20
    }
});

export default EditProductScreen;