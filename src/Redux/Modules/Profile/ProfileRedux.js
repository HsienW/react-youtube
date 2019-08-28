import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {WebStorage, WebStorageKeys} from '../../../Common/WebStorage';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

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
                WebStorage.setSessionStorage(
                    WebStorageKeys.USER_PROFILE_UPLOAD_LIST_ID,
                    respond.data.items[0].contentDetails.relatedPlaylists.uploads
                );
                dispatch(createAction(ProfileChannelActions.getProfileChannelDataSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(ProfileChannelActions.getProfileChannelDataFailed)(error));
            });
    };
};


export const ProfileActionsCreator = {
    getProfileChannelData,
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


