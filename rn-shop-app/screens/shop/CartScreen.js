import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';

const CartScreen = props => {
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

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    color={Colors.accent}
                    title='Order Now'
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        amount={itemData.item.sum} 
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    amount: {
        color: Colors.primary
    },
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default CartScreen;