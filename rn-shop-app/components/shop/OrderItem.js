import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
                title={showDetails ? 'Hide Details' : "Show Details"}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(cartItem => 
                        <CartItem 
                            amount={cartItem.sum}
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            title={cartItem.productTitle}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    date: {
        color: Colors.text,
        fontFamily: 'open-sans',
        fontSize: 16
    },
    detailItems: {
        width: '100%'
    },
    orderItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        // height: 300,
        margin: 20,
        // overflow: 'hidden',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8
    },
    summary: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: '100%'
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    }
});

export default OrderItem;