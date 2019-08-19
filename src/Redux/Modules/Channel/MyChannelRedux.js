import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

export const MyChannelActions = {
    getMyChannelStart: 'GET_MY_CHANNEL_START',
    getMyChannelSuccess: 'GET_MY_CHANNEL_SUCCESS',
    getMyChannelFailed: 'GET_MY_CHANNEL_FAILED',
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

export const MyChannelActionsCreator = {
    getMyChannelData,
};

export default function MyChannelReducer(state = {action: ''}, action) {
    console.log('pppppppppppppppppp');
    console.log(action);
    switch (action.type) {
        case MyChannelActions.getMyChannelSuccess:
        case MyChannelActions.getMyChannelFailed:
            return {action: action};
        
        default:
            return state;
    }
}


