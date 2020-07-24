import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../../store/actions/Shop/cart';
import * as productsActions from '../../../store/actions/Shop/products';
import Colors from '../../../constants/ShopColors';
import HeaderButton from '../../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../../components/UI/HeaderItem';
import ProductItem from '../../../components/Shop/ProductItem';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing, setError]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener(
            'focus', 
            loadProducts
        );

        return () => {
            unsubscribe();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button 
                    color={Colors.primary}
                    onPress={loadProducts}
                    title="Try again" 
                />
            </View>
        );
    }

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

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products} 
            keyExtractor={item => item.id}
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    price={itemData.item.price}
                    title={itemData.item.title}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }} 
                        title="View Details" 
                    />
                    <Button 
                        color={Colors.primary} 
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }} 
                        title="To Cart" 
                    />
                </ProductItem>
            }
        >    
        </FlatList>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='shop'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='shop'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    centered: { 
        alignItems: 'center',
        flex: 1, 
        justifyContent: 'center'
    }
});

export default ProductsOverviewScreen;