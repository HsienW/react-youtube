import {createAction} from 'redux-actions';

export const AuthActions = {
    getAuthStart: 'GET_AUTH_START',
    getAuthSuccess: 'GET_AUTH_SUCCESS',
    getAuthFailed: 'GET_AUTH_FAILED',
};

const getAuthSuccess = (userId) => {
    return (dispatch) => {
        dispatch(createAction(AuthActions.getAuthSuccess)(userId));
    };
};

export const AuthActionsCreator = {
    getAuthSuccess,
};

export default function AuthReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case AuthActions.getAuthSuccess:
            return {actionType: action.type};

        default:
            return state;
    }
}

