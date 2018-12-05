import * as AuthActions from './AuthActions';

/**

 接收 actionType 並做出後續動作

 **/

const AuthReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case AuthActions.GET_AUTH_SUCCESS:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default AuthReducer;