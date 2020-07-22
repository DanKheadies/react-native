import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, View } from 'react-native'; 
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import * as appActions from '../../store/actions/App/app';
import Colors from '../../constants/GuessColors';
import DefaultButton from '../../components/UI/buttons/DefaultButton';
import GameOverScreen from './GameOverScreen';
import GameScreen from './GameScreen';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';
import StartGameScreen from './StartGameScreen';

const GuessScreen = () => {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen 
                onGameOver={gameOverHandler} 
                userChoice={userNumber} 
            />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen 
                onRestart={configureNewGameHandler} 
                roundsNumber={guessRounds} 
                userNumber={userNumber} 
            />
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            {/* <Header title="Guess A Number" /> */}
            {content}
        </SafeAreaView>
    );
}

export const screenOptions = navData => {
    const dispatch = useDispatch();

    return {
        headerTitle: 'Guess',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='guess'
                    iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                    onPress={() => {
                        dispatch(appActions.selectNavigator('home'));
                    }}
                    text='Apps'
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default GuessScreen;