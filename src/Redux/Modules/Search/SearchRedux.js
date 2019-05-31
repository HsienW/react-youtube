import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import * as apiData from '../../../ApiCenter/Api/Api';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

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

const testSearchResultData = (searchKey) => {
    return (dispatch) => {
        console.log(searchKey);
        dispatch(createAction(SearchActions.getSearchStart)());
        dispatch(createAction(SearchActions.getSearchSuccess)(ApiSimulation.getSearchData()));
    };
};

export const SearchActionsCreator = {
    getSearchResultData,
    testSearchResultData
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

