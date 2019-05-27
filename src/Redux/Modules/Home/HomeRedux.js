import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {AuthActions} from '../Auth/AuthRedux';
import * as apiData from '../../../ApiCenter/Api/Api';

export const HomeActions = {
    getHomeStart: 'GET_HOME_START',
    getHomeSuccess: 'GET_HOME_SUCCESS',
    getHomeFailed: 'GET_HOME_FAILED',
};

const getHomeData = (request) => {
    return (dispatch) => {
        dispatch(createAction(HomeActions.getHomeStart)());
        callApi.get(apiData.videoURL, request)
            .then((respond) => {
                dispatch(createAction(HomeActions.getHomeSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(HomeActions.getHomeFailed)(error));
            });
    };
};

export const HomeActionsCreator = {
    getHomeData,
};

export default function HomeReducer(state = {action: ''}, action) {
    switch (action.type) {
        case AuthActions.getAuthSuccess:
        case HomeActions.getHomeSuccess:
        case HomeActions.getHomeFailed:
            return {action: action};

        default:
            return state;
    }
}

