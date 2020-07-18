import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/DeviceColors';
import MapPreview from '../../components/DeviceFeatures/MapPreview';

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const { onLocationPicked } = props;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);

            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.LOCATION
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!', 
                'You need to grant location permissions to use this app.', 
                [{
                    text: 'Okay'
                }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            // console.log(location);

            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            );
        }

        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview 
                location={pickedLocation}
                onPress={pickOnMapHandler}
                style={styles.mapPreview}
            >
                {isFetching ? (
                    <ActivityIndicator 
                        color={Colors.primary}
                        size="large"
                    />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </MapPreview>
            <View style={styles.buttons}>
                <Button 
                    color={Colors.primary}
                    onPress={getLocationHandler}
                    title="Get User Location"
                />
                <Button 
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                    title="Pick on Map"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        borderColor: Colors.grey,
        borderWidth: 1,
        height: 150,
        marginBottom: 10,
        width: '100%'
    }
});

export default LocationPicker;