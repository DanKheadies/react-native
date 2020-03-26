import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    FlatList, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({ 
                        routeName: 'CategoryMeals', 
                        params: {
                            categoryId: itemData.item.id
                        } 
                    });
                }} 
            />
        );
    };

    return (
        // <View style={styles.screen}>
        //     <Text>The Categories Screen!</Text>
        //     <Button title="Go to Meals" onPress={() => {
        //         // props.navigation.navigate({routeName: 'CategoryMeals'});
        //         // props.navigation.push('CategoryMeals');
        //         // props.navigation.replace('CategoryMeals');
        //         props.navigation.navigate('CategoryMeals');
        //     }} /> 
        // </View>

        <FlatList 
            // keyExtractor={(item, index) => item.id}
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} 
        />
    );
};

// CategoriesScreen.navigationOptions = {
//     headerTitle: 'Meal Categories'
// };

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});

export default CategoriesScreen;