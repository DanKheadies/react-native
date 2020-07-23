import Product from "../../../models/Shop/product";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(
                'https://rn-complete-guide-6f30b.firebaseio.com/products.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const loadedProducts = [];
    
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].ownerPushToken,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    };
};

export const createProduct = (title, imageUrl, description, price) => {
    return async (dispatch, getState) => {
        let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let pushToken;

        if (statusObj.status !== 'granted') {
            statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }

        if (statusObj.status !== 'granted') {
            pushToken = null;
        } 
        else {
            pushToken = (await Notifications.getExpoPushTokenAsync()).data;
        }

        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
                `https://rn-complete-guide-6f30b.firebaseio.com/products.json?auth=${token}`
            , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                imageUrl,
                description,
                price,
                ownerId: userId,
                ownerPushToken: pushToken
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                imageUrl,
                description,
                price,
                ownerId: userId,
                pushToken: pushToken
            }
        });
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-complete-guide-6f30b.firebaseio.com/products/${productId}.json?auth=${token}`, 
        {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-complete-guide-6f30b.firebaseio.com/products/${id}.json?auth=${token}`, 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                imageUrl, 
                description
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title, // i.e. title: title
                imageUrl,
                description
            }
        });
    };
};