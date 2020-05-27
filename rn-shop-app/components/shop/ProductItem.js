import React from 'react';
import { 
    Button, 
    Image, 
    Platform,
    StyleSheet, 
    Text, 
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button 
                                color={Colors.primary} 
                                onPress={props.onViewDetail} 
                                title="View Details" 
                            />
                            <Button 
                                color={Colors.primary} 
                                onPress={props.onAddToCart} 
                                title="To Cart" 
                            />
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '25%',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },  
    image: {
        height: '100%',
        width: '100%'
    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: '60%',
        overflow: 'hidden',
        width: '100%'
    },
    price: {
        color: '#999',
        fontFamily: 'open-sans',
        fontSize: 14
    },
    product: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        height: 300,
        margin: 20,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 8
    },
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        height: 24
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;