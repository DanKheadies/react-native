import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as appActions from '../../store/actions/App/app';
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
                        props.navigation.navigate('PlacesDetail', {
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

export const screenOptions = navData => {
    const dispatch = useDispatch();

    return {
        headerTitle: 'Device',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <HeaderItem 
                    color='device'
                    iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
                    onPress={() => {
                        dispatch(appActions.selectNavigator('home'));
                    }}
                    text='Apps'
                />
            </HeaderButtons>
        ),
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
        )
    };
};

export default DeviceScreen;