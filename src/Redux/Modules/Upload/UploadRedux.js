import {createAction} from 'redux-actions';

export const UploadActions = {
    getUploadStart: 'GET_UPLOAD_START',
    getUploadSuccess: 'GET_UPLOAD_SUCCESS',
    getUploadFailed: 'GET_UPLOAD_FAILED',
};

const getUploadSuccess = () => {
    return (dispatch) => {
        dispatch(createAction(UploadActions.getUploadStart));
    };
};

export const UploadActionsCreator = {
    getUploadSuccess,
};

export default function UploadReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case UploadActions.getUploadStart:
            return {actionType: action.type};

        default:
            return state;
    }
}

