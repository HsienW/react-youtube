import {createAction} from 'redux-actions';
import * as AuthActions from './AuthActions';
import AuthApi from '../../../ApiCenter/Auth/AuthApi';

const getAuthStart = createAction(AuthActions.GET_AUTH_START);
const getAuthSuccess = createAction(AuthActions.GET_AUTH_SUCCESS);
const getAuthFailed = createAction(AuthActions.GET_AUTH_FAILED);

const getAuth = (request) => {
    return (dispatch) => {
        dispatch(getAuthStart());
        AuthApi.getAccessToken(request)
            .then((respond) => {
                dispatch(getAuthSuccess(respond));
            })
            .catch((error) => {
                dispatch(getAuthFailed(error));
            });
    };
};

export {
    getAuth,
};
