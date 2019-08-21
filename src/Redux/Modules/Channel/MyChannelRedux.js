import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

export const MyChannelActions = {
    getMyChannelStart: 'GET_MY_CHANNEL_START',
    getMyChannelSuccess: 'GET_MY_CHANNEL_SUCCESS',
    getMyChannelFailed: 'GET_MY_CHANNEL_FAILED',
};

export const MyUploadListActions = {
    getMyUploadListStart: 'GET_MY_UPLOAD_LIST_START',
    getMyUploadListSuccess: 'GET_MY_UPLOAD_LIST_SUCCESS',
    getMyUploadListFailed: 'GET_MY_UPLOAD_LIST_FAILED',
};

export const MyLikeListActions = {
    getMyLikeListStart: 'GET_MY_LIKE_LIST_START',
    getMyLikeListSuccess: 'GET_MY_LIKE_LIST_SUCCESS',
    getMyLikeListFailed: 'GET_MY_LIKE_LIST_FAILED',
};

const getMyChannelData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MyChannelActions.getMyChannelStart)());
        callApi.get(apiData.channelURL, request)
            .then((respond) => {
                dispatch(createAction(MyChannelActions.getMyChannelSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MyChannelActions.getMyChannelFailed)(error));
            });
    };
};

const getMyUploadListData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MyUploadListActions.getMyUploadListStart)());
        callApi.get(apiData.activitiesURL, request)
            .then((respond) => {
                dispatch(createAction(MyUploadListActions.getMyUploadListSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MyUploadListActions.getMyUploadListFailed)(error));
            });
    };
};

const getMyLikeListData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MyLikeListActions.getMyLikeListStart)());
        callApi.get(apiData.videoURL, request)
            .then((respond) => {
                dispatch(createAction(MyLikeListActions.getMyLikeListSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MyLikeListActions.getMyLikeListFailed)(error));
            });
    };
};

export const MyChannelActionsCreator = {
    getMyChannelData,
    getMyUploadListData,
    getMyLikeListData
};

export default function MyChannelReducer(state = {action: ''}, action) {
    switch (action.type) {
        case MyChannelActions.getMyChannelSuccess:
        case MyChannelActions.getMyChannelFailed:
        case MyUploadListActions.getMyUploadListSuccess:
        case MyUploadListActions.getMyUploadListFailed:
        case MyLikeListActions.getMyLikeListSuccess:
        case MyLikeListActions.getMyLikeListFailed:
            return {action: action};
        
        default:
            return state;
    }
}


