import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';

export const UploadVideoActions = {
    doUploadVideoStart: 'DO_UPLOAD_VIDEO_START',
    doUploadVideoSuccess: 'DO_UPLOAD_VIDEO_SUCCESS',
    doUploadVideoFailed: 'DO_UPLOAD_VIDEO_FAILED',
};

export const UploadEditVideoDataActions = {
    uploadEditVideoDataStart: 'UPLOAD_EDIT_VIDEO_DATA_START',
    uploadEditVideoDataSuccess: 'UPLOAD_EDIT_VIDEO_DATA_SUCCESS',
    uploadEditVideoDataFailed: 'UPLOAD_EDIT_VIDEO_DATA_FAILED',
};

const doUploadVideo = (request) => {
    return (dispatch) => {
        dispatch(createAction(UploadVideoActions.doUploadVideoStart));
        callApi.post(request)
            .then((respond) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(error));
            });
    };
};

const uploadEditVideoData = (request) => {
    return (dispatch) => {
        dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataStart));
        callApi.put(request)
            .then((respond) => {
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadEditVideoDataActions.uploadEditVideoDataFailed)(error));
            });
    };
};

export const UploadActionsCreator = {
    doUploadVideo,
    uploadEditVideoData
};

export default function UploadReducer(state = {action: ''}, action) {
    switch (action.type) {
        case UploadVideoActions.doUploadVideoSuccess:
        case UploadVideoActions.doUploadVideoFailed:
        case UploadEditVideoDataActions.uploadEditVideoDataSuccess:
        case UploadEditVideoDataActions.uploadEditVideoDataFailed:
            return {action: action};

        default:
            return state;
    }
}

