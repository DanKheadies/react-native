import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{
                text: 'Okay'
            }]);
        }
    }, [error]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            setError(err.message);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator 
                    color={Colors.primary}
                    size='large'
                />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
            }}>
                <Text>No orders found.</Text>
                <Text>Maybe start ordering some products.</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={orders} 
            keyExtractor={item => item.id} 
            renderItem={itemData => 
                <OrderItem 
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default OrdersScreen;