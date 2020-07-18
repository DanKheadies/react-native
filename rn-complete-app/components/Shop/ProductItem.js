import React from 'react';
import { 
    Image, 
    Platform,
    StyleSheet, 
    Text, 
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';

import Card from './UI/Card';
import Colors from '../../constants/ShopColors';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
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
        color: Colors.grey,
        fontFamily: 'open-sans',
        fontSize: 14
    },
    product: {
        height: 300,
        margin: 20
    },
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;