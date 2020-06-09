import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Card from '../UI/Card';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
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
        </Card>
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
        margin: 20,
        padding: 10
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