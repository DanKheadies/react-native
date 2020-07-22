import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../../constants/DeviceColors';

const MapScreen = props => {
    const initialLocation = props.route.params ? props.route.params.initialLocation : null;
    const readonly = props.route.params ? props.route.params.readonly : false;

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    let mapRegion;
    if (!selectedLocation) {
        mapRegion = {
            latitude: 37.78,
            longitude: -122.43,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
    }
    else {
        mapRegion = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
    }

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            // could show an alert
            return;
        }
        props.navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        if (readonly) { return; }
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    onPress={savePickedLocationHandler}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
            )
        });
    }, [savePickedLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView
            onPress={selectLocationHandler}
            region={mapRegion}
            style={styles.map}
        >
            {markerCoordinates && 
                <Marker
                    coordinate={markerCoordinates}
                    title="Picked Location"
                >
                </Marker> 
            }  
        </MapView>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        color: Platform.OS === 'android' ? 'white' : Colors.primary,
        fontSize: 16
    },
    map: {
        flex: 1
    }
});

export default MapScreen;