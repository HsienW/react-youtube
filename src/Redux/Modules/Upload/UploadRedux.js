import {createAction} from 'redux-actions';
import axios from 'axios';

export const UploadVideoActions = {
    doUploadVideoStart: 'DO_UPLOAD_VIDEO_START',
    doUploadVideoSuccess: 'DO_UPLOAD_VIDEO_SUCCESS',
    doUploadVideoFailed: 'DO_UPLOAD_VIDEO_FAILED',
};

const doUploadVideo = (request) => {
    return (dispatch) => {
        dispatch(createAction(UploadVideoActions.doUploadVideoStart));
        axios(request)
            .then((respond) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(UploadVideoActions.doUploadVideoFailed)(error));
            });
    };
};

export const UploadActionsCreator = {
    doUploadVideo,
};

export default function UploadReducer(state = {action: ''}, action) {
    switch (action.type) {
        case UploadVideoActions.doUploadVideoSuccess:
        case UploadVideoActions.doUploadVideoFailed:
            return {action: action};

        default:
            return state;
    }
}

