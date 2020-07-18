import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/ShopColors';

const Permissions = props => {
    const thisUser = useSelector(state => state.user.thisUser);

    if (thisUser.length < 1 ||
        thisUser[0].permission !== 'editor') {
        return (
            <View></View>
        );
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.drawerItem}>
                <Ionicons 
                    color={Colors.text}
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                    size={23}
                    style={styles.icon}
                />
                <Text style={styles.label}>
                    Admin
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    drawerItem: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 10
    },
    icon: {
        marginRight: 33
    },
    label: {
        color: Colors.black,
        fontFamily: 'open-sans-bold',
        fontSize: 14
    }
});

export default Permissions;