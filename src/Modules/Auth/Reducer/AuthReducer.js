import * as AuthActions from '../Actions/AuthActions';

const AuthReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case AuthActions.GET_AUTH_SUCCESS:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default AuthReducer;