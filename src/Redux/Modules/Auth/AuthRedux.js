import {createAction} from 'redux-actions';
import {WebStorage, WebStorageKeys} from '../../../Common/WebStorage';

export const AuthActions = {
    getAuthStart: 'GET_AUTH_START',
    getAuthSuccess: 'GET_AUTH_SUCCESS',
    getAuthFailed: 'GET_AUTH_FAILED',
};

const getAuthSuccess = (accessToken) => {
    return (dispatch) => {
        dispatch(createAction(AuthActions.getAuthSuccess)(accessToken));
    };
};

export const AuthActionsCreator = {
    getAuthSuccess,
};

export default function AuthReducer(state = {action: ''}, action) {
    switch (action.type) {
        case AuthActions.getAuthSuccess:
            WebStorage.setSessionStorage(WebStorageKeys.ACCESS_TOKEN, action.payload);
            return {action: action.type};

        case AuthActions.getAuthFailed:
            return {action: action.type};

        default:
            return state;
    }
}

