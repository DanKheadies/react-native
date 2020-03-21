import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';


const GameOverScreen = props => {
    return (
        <ScrollView>
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
        // borderRadius: 150,
        borderRadius: Dimensions.get('window').height * 0.666,
        borderWidth: 3,
        borderColor: 'black',
        // width: 300,
        // width: Dimensions.get('window').width * 0.7,
        width: Dimensions.get('window').height * 0.333,
        // height: 300,
        // height: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.333,
        overflow: 'hidden',
        // margin: 30
        marginVertical: Dimensions.get('window').height / 40
    },
    resultContainer: {
        // marginHorizontal: 35
        marginHorizontal: Dimensions.get('window').height / 40
    }, 
    resultText: {
        // fontSize: 20,
        fontSize: Dimensions.get('window').height < 650 ? 16: 20,
        textAlign: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    }
});

export default GameOverScreen;