import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

export const PlayDataActions = {
    getPlayDataStart: 'GET_PLAY_DATA_START',
    getPlayDataSuccess: 'GET_PLAY_DATA_SUCCESS',
    getPlayDataFailed: 'GET_PLAY_DATA_FAILED',
};

export const PlayVideoActions = {
    getPlayVideoStart: 'GET_PLAY_VIDEO_START',
    getPlayVideoSuccess: 'GET_PLAY_VIDEO_SUCCESS',
    getPlayVideoFailed: 'GET_PLAY_VIDEO_FAILED',
};

export const PlayDetailActions = {
    getPlayDetailStart: 'GET_PLAY_DETAIL_START',
    getPlayDetailSuccess: 'GET_PLAY_DETAIL_SUCCESS',
    getPlayDetailFailed: 'GET_PLAY_DETAIL_FAILED',
};

const getPlayDataInfo = (request, videoItemInfo) => {
    return (dispatch) => {
        dispatch(createAction(PlayDataActions.getPlayDataStart)());
        callApi.get(apiData.videoURL, request)
            .then((respond) => {
                console.log('ttttttttttttttt');
                dispatch(createAction(PlayDataActions.getPlayDataSuccess)(respond), videoItemInfo);
            })
            .catch((error) => {
                dispatch(createAction(PlayDataActions.getPlayDataFailed)(error));
            });
    };
};

const getPlayVideoData = (videoItemInfo) => {
    return (dispatch) => {
        dispatch(createAction(PlayVideoActions.getPlayVideoStart)());
        dispatch(createAction(PlayVideoActions.getPlayVideoSuccess)(videoItemInfo));
    };
};

const getPlayDetailData = (request) => {
    return (dispatch) => {
        dispatch(createAction(PlayDetailActions.getPlayDetailStart)());
        callApi.get(apiData.videoURL, request)
            .then((respond) => {
                dispatch(createAction(PlayDetailActions.getPlayDetailSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(PlayDetailActions.getPlayDetailFailed)(error));
            });
    };
};

export const PlayActionsCreator = {
    getPlayDataInfo,
    getPlayVideoData,
    getPlayDetailData,
};

export default function PlayReducer(state = {action: ''}, action) {
    console.log('rrrrrrrrrrrrrrrrr');
    console.log(action.type);
    switch (action.type) {
        case PlayDataActions.getPlayDataSuccess:
        case PlayDataActions.getPlayDataFailed:
        case PlayVideoActions.getPlayVideoSuccess:
        case PlayVideoActions.getPlayVideoFailed:
        case PlayDetailActions.getPlayDetailSuccess:
        case PlayDetailActions.getPlayDetailFailed:
            return {action: action};

        default:
            return state;
    }
}

