/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE
} from 'Actions/types';

/**
 * initial auth user
 */
let userInStorage = JSON.parse(localStorage.getItem('user-info'));

const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    loading: false,
    "user-info": userInStorage,
    updatedProfile: userInStorage == null ? false : userInStorage.imageUrl ? true : false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, 
                loading: false, 
                user: action.payload.id, 
                "user-info": action.payload,
                updatedProfile: action.payload.imageUrl ? true : false
            };

        case LOGIN_USER_FAILURE:
            return { ...state, loading: false };

        case LOGOUT_USER:
            return { ...state, user: null,  "user-info": null  };

        case SIGNUP_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case SIGNUP_USER_FAILURE:
            return { ...state, loading: false };

        default: return { ...state };
    }
}
