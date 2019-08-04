import {createAction} from 'redux-actions';

export const ChannelActions = {
    getChannelStart: 'GET_CHANNEL_START',
    getChannelSuccess: 'GET_CHANNEL_SUCCESS',
    getChannelFailed: 'GET_CHANNEL_FAILED',
};

const getChannelSuccess = () => {
    return (dispatch) => {
        dispatch(createAction(ChannelActions.getChannelStart));
    };
};

export const ChannelActionsCreator = {
    getChannelSuccess,
};

export default function ChannelReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case ChannelActions.getChannelStart:
            return {actionType: action.type};

        default:
            return state;
    }
}

