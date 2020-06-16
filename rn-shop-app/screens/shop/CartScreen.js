import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => 
            a.productId > b.productId ? 1 : -1
        );
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{
                text: 'Okay'
            }]);
        }
    }, [error]);

    const sendOrderHandler = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        } catch (err) {
            setError(err.message);
        }
        
        setIsLoading(false);
    }, [dispatch, cartItems, cartTotalAmount]);

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator 
                        color={Colors.primary}
                        size='small'
                    />
                ) : (
                    <Button 
                        color={Colors.accent}
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                        title='Order Now'
                    />
                )}
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        amount={itemData.item.sum} 
                        deletable
                        onRemove={sendOrderHandler}
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    amount: {
        color: Colors.primary
    },
    screen: {
        margin: 20
    },
    summary: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default CartScreen;