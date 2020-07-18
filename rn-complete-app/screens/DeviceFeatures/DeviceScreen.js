import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as placesActions from '../../store/actions/DeviceFeatures/places';
import HeaderButton from '../../components/UI/buttons/HeaderButton';
import HeaderItem from '../../components/UI/HeaderItem';
import PlaceItem from '../../components/DeviceFeatures/PlaceItem';

const DeviceScreen = props => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <PlaceItem
                    address={itemData.item.address}
                    image={itemData.item.imageUri}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        });
                    }}
                    title={itemData.item.title}
                />
            }
        />
    );
};

DeviceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Device',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='device'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace')
                    }}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='device'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                    title='Menu'
                />
            </HeaderButtons>
        )
    };
};

export default DeviceScreen;