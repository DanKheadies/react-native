import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as appActions from '../store/actions/App/app';
import DefaultButton from '../components/UI/buttons/DefaultButton';
import DefaultText from '../components/UI/DefaultText';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View style={styles.container}>
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
                    <View style={styles.sectionContainer}>
                        <View style={styles.buttonContainer}>
                            <DefaultButton
                                color={'notifications'}
                                onPress={() => {
                                    dispatch(appActions.selectNavigator('notifications'));
                                }}
                                title={'Notifications'}
                            />
                        </View>
                        <DefaultText>
                            Expo notifications via local and Expo's servers, i.e. push.
                        </DefaultText>
                    </View>
                    <View style={styles.sectionContainer}>
                        <View style={styles.buttonContainer}>
                            <DefaultButton
                                color={'speech'}
                                onPress={() => {
                                    dispatch(appActions.selectNavigator('speech'));
                                }}
                                title={'Speech to Text'}
                            />
                        </View>
                        <DefaultText>
                            Expo and Google Cloud turn speech to text.
                        </DefaultText>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Choose an App'
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
        paddingBottom: 50,
        paddingTop: 5
    },
    sectionContainer: {
        paddingHorizontal: 35,
        paddingVertical: 25
    }
});

export default HomeScreen;