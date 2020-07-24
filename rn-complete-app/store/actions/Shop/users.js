import User from "../../../models/Shop/user";

export const CREATE_USER = 'CREATE_USER';
export const SET_USER = 'SET_USER';

export const fetchUser = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(
                'https://rn-complete-guide-6f30b.firebaseio.com/users.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const loadedUsers = [];
    
            for (const key in resData) {
                loadedUsers.push(new User(
                    key,
                    resData[key].email,
                    resData[key].permission,
                    resData[key].userId
                ));
            }
    
            dispatch({
                type: SET_USER,
                aUser: loadedUsers.filter(user => user.userId === userId)
            });
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    };
};

export const createUser = (email, permission) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
                `https://rn-complete-guide-6f30b.firebaseio.com/users.json?auth=${token}`
            , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                permission,
                userId
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_USER,
            userData: {
                id: resData.name,
                email,
                permission,
                userId: userId
            }
        });
    };
};