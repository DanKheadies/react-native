import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
    }


    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={{ ...styles.mapPreview, ...props.style}}
        >
            {props.location ? (
                <Image 
                    source={{ uri: imagePreviewUrl }}
                    style={styles.mapImage}
                />
            ) : (
                props.children
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapImage: {
        height: '100%',
        width: '100%'
    },
    mapPreview: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MapPreview;