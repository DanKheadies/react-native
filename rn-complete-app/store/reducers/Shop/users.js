import { CREATE_USER, SET_USER } from '../../actions/Shop/users';
import User from '../../../models/Shop/user';

const initialState = {
    thisUser: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                thisUser: action.aUser
            };
            
        case CREATE_USER:
            const newUser = new User(
                action.userData.id,
                action.userData.email,
                action.userData.permission
            );
            return {
                ...state,
                thisUser: state.thisUser.concat(newUser)
            };
    }
    return state;
};