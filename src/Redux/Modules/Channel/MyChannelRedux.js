import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
// import {channelApi} from '../../../ApiCenter/Api/Api';
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

export const MySubscribeListActions = {
    getMySubscribeListStart: 'GET_MY_SUBSCRIBE_LIST_START',
    getMySubscribeListSuccess: 'GET_MY_SUBSCRIBE_LIST_SUCCESS',
    getMySubscribeListFailed: 'GET_MY_SUBSCRIBE_LIST_FAILED',
};

const getMyChannelData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MyChannelActions.getMyChannelStart)());
        callApi.get(apiData.channelURL, request)
            .then((respond) => {
                console.log('mmmmmmmmmmmmmmmmmmmmmmmm');
                console.log(respond);
                dispatch(createAction(MyChannelActions.getMyChannelSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MyChannelActions.getMyChannelFailed)(error));
            });
    };
};

// const getMyUploadVideoListData = (request) => {
//     return (dispatch) => {
//         dispatch(createAction(MyUploadListActions.getMyUploadListStart)());
//         callApi.get(apiData.activitiesURL, request)
//             .then((respond) => {
//                 dispatch(createAction(MyUploadListActions.getMyUploadListSuccess)(respond));
//             })
//             .catch((error) => {
//                 dispatch(createAction(MyUploadListActions.getMyUploadListFailed)(error));
//             });
//     };
// };

const getMyUploadVideoListData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MyUploadListActions.getMyUploadListStart)());
        callApi.get(apiData.activitiesURL, request)
            .then((respond) => {
                console.log(',,,,,,,,,,,,,,,,,,,,,,,,');
                console.log(respond);
                dispatch(createAction(MyUploadListActions.getMyUploadListSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MyUploadListActions.getMyUploadListFailed)(error));
            });
    };
};

const getMyLikeVideoListData = (request) => {
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

const getMySubscribeListData = (request) => {
    return (dispatch) => {
        dispatch(createAction(MySubscribeListActions.getMySubscribeListStart)());
        callApi.get(apiData.playListURL, request)
            .then((respond) => {
                dispatch(createAction(MySubscribeListActions.getMySubscribeListSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(MySubscribeListActions.getMySubscribeListFailed)(error));
            });
    };
};

export const MyChannelActionsCreator = {
    getMyChannelData,
    getMyUploadVideoListData,
    getMyLikeVideoListData,
    getMySubscribeListData
};

export default function MyChannelReducer(state = {action: ''}, action) {
    switch (action.type) {
        case MyChannelActions.getMyChannelSuccess:
        case MyChannelActions.getMyChannelFailed:
        case MyUploadListActions.getMyUploadListSuccess:
        case MyUploadListActions.getMyUploadListFailed:
        case MyLikeListActions.getMyLikeListSuccess:
        case MyLikeListActions.getMyLikeListFailed:
        case MySubscribeListActions.getMySubscribeListSuccess:
        case MySubscribeListActions.getMySubscribeListFailed:
            return {action: action};
        
        default:
            return state;
    }
}


