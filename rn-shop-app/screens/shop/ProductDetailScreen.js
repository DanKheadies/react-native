import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === productId)
    );

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    actions: {
        alignItems: 'center',
        marginVertical: 10
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    image: {
        height: 300,
        width: '100%'
    },
    price: {
        color: '#999',
        // fontFamily: 'open-sans-bold',
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'center'
    },
});

export default ProductDetailScreen;