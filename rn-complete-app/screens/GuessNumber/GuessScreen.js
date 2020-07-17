import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import GameOverScreen from './GameOverScreen';
import GameScreen from './GameScreen';
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

GuessScreen.navigationOptions = {
    headerTitle: 'Guess'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default GuessScreen;