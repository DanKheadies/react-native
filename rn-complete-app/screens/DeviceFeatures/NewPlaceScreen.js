import React, { useCallback, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
        if (titleValue === '' ||
            selectedImage === undefined ||
            selectedLocation === undefined) {
            Alert.alert(
                'Oh nooo.. Looks like ya left something blank.', 'Please make sure there is a title, image, and location. Thank you.', [
                    { text: 'Okay' }
            ]);
            return;
        }

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
                    route={props.route}
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

export const screenOptions = {
    headerTitle: 'Add New Place'
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