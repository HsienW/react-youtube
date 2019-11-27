import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {ProfileRedux} from '../../../Redux/Modules';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

export const HomeRecommendActions = {
    getHomeRecommendStart: 'GET_HOME_RECOMMEND_START',
    getHomeRecommendSuccess: 'GET_HOME_RECOMMEND_SUCCESS',
    getHomeRecommendFailed: 'GET_HOME_RECOMMEND_FAILED',
};

export const HomePageActions = {
    getHomePageSuccess: 'GET_HOME_PAGE_SUCCESS',
    getHomePageFailed: 'GET_HOME_PAGE_FAILED',
};

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

const simulationGetHomeData = () => {
    return (dispatch) => {
        dispatch(createAction(HomeActions.getHomeStart)());
        dispatch(createAction(HomeActions.getHomeSuccess)(ApiSimulation.getSearchHome()));
    };
};

export const HomeActionsCreator = {
    getHomeData,
    simulationGetHomeData,
    testGetHomeRecommendData
};

export default function HomeReducer(state = {action: ''}, action) {
    switch (action.type) {
        case HomeActions.getHomeSuccess:
        case HomeActions.getHomeFailed:
        case ProfileRedux.ProfileChannelActions.getProfileChannelDataSuccess:
        case ProfileRedux.ProfileChannelActions.getProfileChannelDataFailed:
            return {action: action};

        default:
            return state;
    }
}

