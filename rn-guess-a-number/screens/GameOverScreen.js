import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over...</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    // fadeDuration={5000}
                    style={styles.image} 
                    source={require('../assets/original.png')} 
                    // source={{uri: 'https://www.roughguides.com/wp-content/uploads/2016/02/matterhorn-shutterstock_1118486243.jpg'}}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the 
                    number <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <View style={styles.button}>
                <MainButton onPress={props.onRestart}>
                    NEW GAME
                </MainButton>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        margin: 30
    },
    resultContainer: {
        marginHorizontal: 35
    }, 
    resultText: {
        fontSize: 20,
        textAlign: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;