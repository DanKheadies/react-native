import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import BodyText from '../../components/Guess/BodyText';
import Colors from '../../constants/GuessColors';
import MainButton from '../../components/Guess/MainButton';
import TitleText from '../../components/Guess/TitleText';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText style={styles.title}>
                    The game is over...
                </TitleText>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image} 
                        source={require('../../assets/Guess/original.png')} 
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed 
                        <Text style={styles.highlight}>
                            {' ' + props.roundsNumber + ' '}
                        </Text> 
                        rounds to guess the number 
                        <Text style={styles.highlight}>
                            {' ' + props.userNumber}
                        </Text>.
                    </BodyText>
                </View>
                <View style={styles.button}>
                    <MainButton onPress={props.onRestart}>
                        NEW GAME
                    </MainButton>
                </View>
            </View>
        </ScrollView>
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
        borderRadius: Dimensions.get('window').height * 0.666,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').height * 0.333,
        height: Dimensions.get('window').height * 0.333,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 40
    },
    resultContainer: {
        marginHorizontal: Dimensions.get('window').height / 40
    }, 
    resultText: {
        fontSize: Dimensions.get('window').height < 650 ? 16: 20,
        textAlign: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10
    }
});

export default GameOverScreen;