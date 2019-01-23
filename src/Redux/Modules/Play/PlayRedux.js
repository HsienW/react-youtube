import {createAction} from 'redux-actions';

export const PlayActions = {
    getPlayStart: 'GET_PLAY_START',
    getPlaySuccess: 'GET_PLAY_SUCCESS',
    getPlayFailed: 'GET_PLAY_FAILED',
};

const getPlaySuccess = () => {
    return (dispatch) => {
        dispatch(createAction(PlayActions.getPlayStart));
    };
};

export const PlayActionsCreator = {
    getPlaySuccess,
};

export default function PlayReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case PlayActions.getPlayStart:
            return {actionType: action.type};

        default:
            return state;
    }
}

