import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CartItem = props => {
    return (
        <View style={styles.cardItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}  </Text>
                <Text style={styles.maintText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.maintText}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                        color='red'
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 10 
    },
    deleteButton: {
        margin: 20
    },
    itemData: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    quantity: {
        color: Colors.text,
        fontFamily: 'open-sans',
        fontSize: 16
    }
});

export default CartItem;