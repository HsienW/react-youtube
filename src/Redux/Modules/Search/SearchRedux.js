import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {formatData} from '../../../Common/BasicService';
import * as apiData from '../../../ApiCenter/Api/Api';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

export const SearchActions = {
    getSearchStart: 'GET_SEARCH_START',
    getSearchSuccess: 'GET_SEARCH_SUCCESS',
    getSearchFailed: 'GET_SEARCH_FAILED',
};

export const NextSearchActions = {
    getNextSearchStart: 'GET_NEXT_SEARCH_START',
    getNextSearchSuccess: 'GET_NEXT_SEARCH_SUCCESS',
    getNextSearchFailed: 'GET_NEXT_SEARCH_FAILED',
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

const getNextSearchResultData = (request) => {
    return (dispatch) => {
        dispatch(createAction(SearchActions.getSearchStart)());
        callApi.get(apiData.searchURL, request)
            .then((respond) => {
                dispatch(createAction(NextSearchActions.getNextSearchSuccess)(respond));
            })
            .catch((error) => {
                dispatch(createAction(NextSearchActions.getNextSearchSuccess)(error));
            });
    };
};

const testSearchResultData = (searchKey, searchDataIndex) => {
    return (dispatch) => {
        console.log(searchKey);
        dispatch(createAction(SearchActions.getSearchStart)());
        dispatch(createAction(NextSearchActions.getNextSearchSuccess)(
            formatData.searchResultIndex(ApiSimulation.getSearchData(), searchDataIndex)));
    };
};

export const SearchActionsCreator = {
    getSearchResultData,
    getNextSearchResultData,
    testSearchResultData,
};

export default function SearchReducer(state = {action: ''}, action) {
    switch (action.type) {
        case SearchActions.getSearchSuccess:
        case SearchActions.getSearchFailed:
        case NextSearchActions.getNextSearchSuccess:
        case NextSearchActions.getNextSearchFailed:
            return {action: action};

        default:
            return state;
    }
}

