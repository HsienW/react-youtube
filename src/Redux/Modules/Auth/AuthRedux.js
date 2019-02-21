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

const getTest = () => {
    return (dispatch) => {
        dispatch(createAction(AuthActions.getAuthFailed)());
    };
};

export const AuthActionsCreator = {
    getAuthSuccess,
    getTest
};

export default function AuthReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case AuthActions.getAuthSuccess:
        case AuthActions.getAuthFailed:
            return {actionType: action.type};

        default:
            return state;
    }
}

