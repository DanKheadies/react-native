import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as appActions from '../store/actions/App/app';
import DefaultButton from '../components/UI/buttons/DefaultButton';
import DefaultText from '../components/UI/DefaultText';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <DefaultText>Choose an App:</DefaultText>
            </View>
            <View style={styles.buttons}>
                <View style={styles.sectionContainer}>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            color={'goal'}
                            onPress={() => {
                                dispatch(appActions.selectNavigator('goals'));
                            }}
                            title={'Make Some Goals'}
                        />
                    </View>
                    <DefaultText>
                        Simple use of state and a modal.
                    </DefaultText>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            color={'guess'}
                            onPress={() => {
                                dispatch(appActions.selectNavigator('guess'));
                            }}
                            title={'Guess a Number'}
                        />
                    </View>
                    <DefaultText>
                        State and screen utilization with device sizing calculations.
                    </DefaultText>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            color={'navigation'}
                            onPress={() => {
                                dispatch(appActions.selectNavigator('navigation'));
                            }}
                            title={'Navigate Meals'}
                        />
                    </View>
                    <DefaultText>
                        State and store with moderate persistance. Data and model use.
                    </DefaultText>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            color={'shop'}
                            onPress={() => {
                                dispatch(appActions.selectNavigator('shop'));
                            }}
                            title={'Shop'}
                        />
                    </View>
                    <DefaultText>
                        Authentication and server-state management. 
                    </DefaultText>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.buttonContainer}>
                        <DefaultButton
                            color={'device'}
                            onPress={() => {
                                dispatch(appActions.selectNavigator('device'));
                            }}
                            title={'Use Device Features'}
                        />
                    </View>
                    <DefaultText>
                        Expo accessible native device features.
                    </DefaultText>
                </View>
            </View>
        </View>
    );
};

export const screenOptions = {
    headerTitle: 'Academind Apps w/ Max'
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 5,
        width: '100%'
    },
    buttons: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    container: {
        flex: 1,
        marginBottom: 50
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 25
    },
    sectionContainer: {
        marginVertical: 15,
        paddingHorizontal: 35
    }
});

export default HomeScreen;