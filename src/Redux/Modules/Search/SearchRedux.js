import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/Api';

export const SearchActions = {
    getSearchStart: 'GET_SEARCH_START',
    getSearchSuccess: 'GET_SEARCH_SUCCESS',
    getSearchFailed: 'GET_SEARCH_FAILED',
};

const getSearchResultData = (request) => {
    return (dispatch) => {
        dispatch(createAction(SearchActions.getSearchStart)());
        callApi.get(apiData.searchURL, request)
            .then((respond) => {
                dispatch(createAction(SearchActions.getSearchSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(SearchActions.getSearchFailed)(error));
            });
    };
};

export const SearchActionsCreator = {
    getSearchResultData,
};

export default function SearchReducer(state = {action: ''}, action) {
    switch (action.type) {
        case SearchActions.getSearchSuccess:
        case SearchActions.getSearchFailed:
            return {action: action};

        default:
            return state;
    }
}

