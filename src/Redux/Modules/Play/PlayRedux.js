import {createAction} from 'redux-actions';
// import {callApi} from '../../../ApiCenter/Api/CallApi';
// import * as apiData from '../../../ApiCenter/Api/Api';

export const PlayActions = {
    getPlayStart: 'GET_PLAY_START',
    getPlaySuccess: 'GET_PLAY_SUCCESS',
    getPlayFailed: 'GET_PLAY_FAILED',
};

const getPlayDataStart = (videoItemInfo) => {
    return (dispatch) => {
        dispatch(createAction(PlayActions.getPlaySuccess)(videoItemInfo));
    };
};

export const PlayActionsCreator = {
    getPlayDataStart
};

export default function PlayReducer(state = {action: ''}, action) {
    switch (action.type) {
        case PlayActions.getPlaySuccess:
        case PlayActions.getPlayFailed:
            return {action: action};

        default:
            return state;
    }
}

