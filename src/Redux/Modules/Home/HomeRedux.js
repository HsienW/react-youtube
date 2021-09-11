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

const getHomeRecommendData = (request) => {
    return (dispatch) => {
        dispatch(createAction(HomeRecommendActions.getHomeRecommendStart)());
        callApi.get(apiData.videoURL, request)
            .then((respond) => {
                dispatch(createAction(HomeRecommendActions.getHomeRecommendSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(HomeRecommendActions.getHomeRecommendFailed)(error));
            });
    };
};

const simulationGetHomeRecommendData = () => {
    return (dispatch) => {
        dispatch(createAction(HomeRecommendActions.getHomeRecommendStart)());
        dispatch(createAction(HomeRecommendActions.getHomeRecommendSuccess)(ApiSimulation.getSearchHome()));
    };
};

export const HomeActionsCreator = {
    getHomeRecommendData,
    simulationGetHomeRecommendData,
};

export default function HomeReducer(state = {action: ''}, action) {
    switch (action.type) {
        case HomeRecommendActions.getHomeRecommendSuccess:
        case HomeRecommendActions.getHomeRecommendFailed:
        case ProfileRedux.ProfileChannelActions.getProfileChannelDataSuccess:
        case ProfileRedux.ProfileChannelActions.getProfileChannelDataFailed:
            return {action: action};

        default:
            return state;
    }
}

