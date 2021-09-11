import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';
import {WebStorage, WebStorageKeys} from '../../../Common/WebStorage';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

export const ProfileChannelActions = {
    getProfileChannelDataStart: 'GET_PROFILE_CHANNEL_DATA_START',
    getProfileChannelDataSuccess: 'GET_PROFILE_CHANNEL_DATA_SUCCESS',
    getProfileChannelDataFailed: 'GET_PROFILE_CHANNEL_DATA_FAILED',
};

const getProfileChannelData = (request) => {
    return (dispatch) => {
        dispatch(createAction(ProfileChannelActions.getProfileChannelDataStart)());
        callApi.get(apiData.channelURL, request)
            .then((respond) => {
                WebStorage.setSessionStorage(WebStorageKeys.USER_PROFILE_UPLOAD_LIST_ID, respond.data.items[0].contentDetails.relatedPlaylists.uploads);
                dispatch(createAction(ProfileChannelActions.getProfileChannelDataSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(ProfileChannelActions.getProfileChannelDataFailed)(error));
            });
    };
};

const simulationGetProfileChannelData = () => {
    return (dispatch) => {
        dispatch(createAction(ProfileChannelActions.getProfileChannelDataStart)());
        dispatch(createAction(ProfileChannelActions.getProfileChannelDataSuccess)(ApiSimulation.getChannels()));
    };
};


export const ProfileActionsCreator = {
    getProfileChannelData,
    simulationGetProfileChannelData
};

export default function ProfileReducer(state = {action: ''}, action) {
    switch (action.type) {
        case ProfileChannelActions.getProfileChannelDataSuccess:
        case ProfileChannelActions.getProfileChannelDataFailed:
            return {action: action};
        
        default:
            return state;
    }
}


