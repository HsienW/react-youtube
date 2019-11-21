import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';

export const SubscribeActions = {
    getSubscribeStart: 'GET_SUBSCRIBE_START',
    getSubscribeSuccess: 'GET_SUBSCRIBE_SUCCESS',
    getSubscribeFailed: 'GET_SUBSCRIBE_FAILED',
};

// const aaa = {
//     'error': {
//         'errors': [
//             {
//                 'domain': 'youtube.video',
//                 'reason': 'invalidCategoryId',
//                 'message': 'The method to retrieve supported categories.',
//                 'locationType': 'other',
//                 'location': 'body.snippet.categoryId'
//             }
//         ],
//         'message': 'The method to retrieve supported categories.'
//     }
// };

const getSubscribeNoticeData = (request) => {
    return (dispatch) => {
        dispatch(createAction(SubscribeActions.getSubscribeStart)());
        callApi.get(apiData.subscriptionURL, request)
            .then((respond) => {
                dispatch(createAction(SubscribeActions.getSubscribeSuccess)(respond));
                // dispatch(createAction(SubscribeActions.getSubscribeFailed)(aaa));
            })
            .catch((error) => {
                dispatch(createAction(SubscribeActions.getSubscribeFailed)(error));
            });
    };
};

export const HeaderActionsCreator = {
    getSubscribeNoticeData,
};

export default function HeaderReducer(state = {action: ''}, action) {
    switch (action.type) {
        case SubscribeActions.getSubscribeSuccess:
        case SubscribeActions.getSubscribeFailed:
            return {action: action};
        
        default:
            return state;
    }
}

