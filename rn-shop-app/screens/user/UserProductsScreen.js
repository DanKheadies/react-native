import React from 'react';
import { Alert, Button, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

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
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    };

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        });
    };

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

export default UserProductsScreen;