import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{
                text: 'Okay'
            }]);
        }
    }, [error]);

    const onPressDeleteHandler = useCallback(async (id) => {
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(productsActions.deleteProduct(id));
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, [dispatch]);

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {
                text: 'No',
                style: 'default'
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    onPressDeleteHandler(id)
                }
            }
        ]);
    };

    if (userProducts.length === 0) {
        return (
            <View style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
            }}>
                <Text>No products found.</Text>
                <Text>Maybe start creating some!</Text>
            </View>
        );
    }

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        });
    };

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

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    onSelect={()=> {
                        editProductHandler(itemData.item.id);
                    }}
                    price={itemData.item.price}
                    title={itemData.item.title}
                >
                    <Button 
                        color={Colors.primary} 
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }} 
                        title="Edit" 
                    />
                    <Button 
                        color={Colors.primary} 
                        onPress={() => {
                            deleteHandler(itemData.item.id);
                        }} 
                        // onPress={deleteHandler.bind(this, itemData.item.id)}
                        title="Delete" 
                    />
                </ProductItem>
            }
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Add'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
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

export default UserProductsScreen;