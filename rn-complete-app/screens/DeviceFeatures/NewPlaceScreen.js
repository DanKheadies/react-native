import React, { useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as placesActions from '../../store/actions/DeviceFeatures/places';
import Colors from '../../constants/DeviceColors';
import ImagePicker from '../../components/DeviceFeatures/ImagePicker';
import LocationPicker from '../../components/DeviceFeatures/LocationPicker';

const NewPlaceScreen = props => {
    const [selectedImage, setSelectedImage] = useState();
    const [titleValue, setTitleValue] = useState('');
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    onChangeText={titleChangeHandler}
                    style={styles.textInput} 
                    value={titleValue}
                />
                <ImagePicker 
                    onImageTaken={imageTakenHandler}
                />
                <LocationPicker
                    onLocationPicked={locationPickedHandler}
                    navigation={props.navigation}
                />
                <Button 
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                    title="Save Place"
                />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 4
    }
});

export default NewPlaceScreen;