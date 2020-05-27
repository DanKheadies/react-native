import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    price={itemData.item.price}
                    title={itemData.item.title}
                    onAddToCart={() => {}}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        });
                    }}
                />
            }
        >    
        </FlatList>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;