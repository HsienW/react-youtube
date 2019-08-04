import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

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

export const PlayCommentActions = {
    getPlayCommentStart: 'GET_PLAY_COMMENT_START',
    getPlayCommentSuccess: 'GET_PLAY_COMMENT_SUCCESS',
    getPlayCommentFailed: 'GET_PLAY_COMMENT_FAILED',
};

export const PlayRelatedActions = {
    getPlayRelatedStart: 'GET_PLAY_RELATED_START',
    getPlayRelatedSuccess: 'GET_PLAY_RELATED_SUCCESS',
    getPlayRelatedFailed: 'GET_PLAY_RELATED_FAILED',
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

const getPlayCommentData = (request) => {
    return (dispatch) => {
        dispatch(createAction(PlayCommentActions.getPlayCommentStart)());
        callApi.get(apiData.commentURL, request)
            .then((respond) => {
                dispatch(createAction(PlayCommentActions.getPlayCommentSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(PlayCommentActions.getPlayCommentFailed)(error));
            });
    };
};

const getPlayRelatedData = (request) => {
    return (dispatch) => {
        dispatch(createAction(PlayRelatedActions.getPlayRelatedStart)());
        callApi.get(apiData.searchURL, request)
            .then((respond) => {
                dispatch(createAction(PlayRelatedActions.getPlayRelatedSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(PlayRelatedActions.getPlayRelatedFailed)(error));
            });
    };
};

export const PlayActionsCreator = {
    getPlayVideoData,
    getPlayDetailData,
    getPlayCommentData,
    getPlayRelatedData
};

export default function PlayReducer(state = {action: ''}, action) {
    switch (action.type) {
        case PlayVideoActions.getPlayVideoSuccess:
        case PlayVideoActions.getPlayVideoFailed:
        case PlayDetailActions.getPlayDetailSuccess:
        case PlayDetailActions.getPlayDetailFailed:
        case PlayCommentActions.getPlayCommentSuccess:
        case PlayCommentActions.getPlayCommentFailed:
        case PlayRelatedActions.getPlayRelatedSuccess:
        case PlayRelatedActions.getPlayRelatedFailed:
            return {action: action};
        
        default:
            return state;
    }
}

