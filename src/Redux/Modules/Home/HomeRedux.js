import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/Api';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

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

const testGetHomeData = (request) => {
    console.log(request);
    return (dispatch) => {
        dispatch(createAction(HomeActions.getHomeStart)());
        dispatch(createAction(HomeActions.getHomeSuccess)(ApiSimulation.getSearchHome()));
    };
};

export const HomeActionsCreator = {
    getHomeData,
    testGetHomeData
};

export default function HomeReducer(state = {action: ''}, action) {
    switch (action.type) {
        case HomeActions.getHomeSuccess:
        case HomeActions.getHomeFailed:
            return {action: action};

        default:
            return state;
    }
}

