import React from 'react';
import { StyleSheet, View } from 'react-native';

import DefaultButton from '../components/UI/buttons/DefaultButton';
import DefaultText from '../components/UI/DefaultText';

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <DefaultText>Choose an App:</DefaultText>
            </View>
            <View style={styles.buttons}>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        color={'goal'}
                        onPress={() => {
                            props.navigation.navigate('Goals');
                        }}
                        title={'Make Some Goals'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        color={'guess'}
                        onPress={() => {
                            props.navigation.navigate('Guess');
                        }}
                        title={'Guess a Number'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        color={'navigation'}
                        onPress={() => {
                            props.navigation.navigate('MealsFav');
                        }}
                        title={'Navigate Meals'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        color={'shop'}
                        onPress={() => {
                            props.navigation.navigate('Shop');
                        }}
                        title={'Shop'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        color={'device'}
                        onPress={() => {
                            props.navigation.navigate('Device');
                        }}
                        title={'Use Device Features'}
                    />
                </View>
            </View>
        </View>
    );
};

HomeScreen.navigationOptions = {
    headerTitle: 'Home'
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 15
    },
    buttons: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    container: {
        flex: 1
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 25
    }
});

export default HomeScreen;