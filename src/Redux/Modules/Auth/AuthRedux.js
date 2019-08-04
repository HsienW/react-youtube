import {createAction} from 'redux-actions';

export const AuthActions = {
    getAuthStart: 'GET_AUTH_START',
    getAuthSuccess: 'GET_AUTH_SUCCESS',
    getAuthFailed: 'GET_AUTH_FAILED',
};

const getAuthSuccess = () => {
    return (dispatch) => {
        dispatch(createAction(AuthActions.getAuthSuccess)());
    };
};

const getAuthFailed = () => {
    return (dispatch) => {
        dispatch(createAction(AuthActions.getAuthFailed)());
    };
};

export const AuthActionsCreator = {
    getAuthSuccess,
    getAuthFailed
};

export default function AuthReducer(state = {action: ''}, action) {
    switch (action.type) {
        case AuthActions.getAuthSuccess:
        case AuthActions.getAuthFailed:
            return {action: action.type};

        default:
            return state;
    }
}

