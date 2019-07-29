import {createAction} from 'redux-actions';
import {callApi} from '../../../ApiCenter/Api/CallApi';
import {formatData} from '../../../Common/BasicService';
import * as apiData from '../../../ApiCenter/Api/ApiConfig';
import ApiSimulation from '../../../ApiCenter/Api/ApiSimulation';

// export const SearchActions = {
//     getSearchStart: 'GET_SEARCH_START',
//     getSearchSuccess: 'GET_SEARCH_SUCCESS',
//     getSearchFailed: 'GET_SEARCH_FAILED',
// };

export const ClearSearchActions = {
    clearSearchData: 'CLEAR_SEARCH_DATA',
};

export const InitialSearchActions = {
    getInitialSearchStart: 'GET_INITIAL_SEARCH_START',
    getInitialSearchSuccess: 'GET_INITIAL_SEARCH_SUCCESS',
    getInitialSearchFailed: 'GET_INITIAL_SEARCH_FAILED',
};

export const NextSearchActions = {
    getNextSearchStart: 'GET_NEXT_SEARCH_START',
    getNextSearchSuccess: 'GET_NEXT_SEARCH_SUCCESS',
    getNextSearchFailed: 'GET_NEXT_SEARCH_FAILED',
};

// const getSearchResultData = (request) => {
//     return (dispatch) => {
//         dispatch(createAction(SearchActions.getSearchStart)());
//         callApi.get(apiData.searchURL, request)
//             .then((respond) => {
//                 dispatch(createAction(SearchActions.getSearchSuccess)(respond));
//             })
//             .catch((error) => {
//                 dispatch(createAction(SearchActions.getSearchFailed)(error));
//             });
//     };
// };

const getInitialSearchResultData = (request, searchDataIndex) => {
    return (dispatch) => {
        dispatch(createAction(InitialSearchActions.getInitialSearchStart)());
        callApi.get(apiData.searchURL, request)
            .then((respond) => {
                dispatch(createAction(ClearSearchActions.clearSearchData));
                dispatch(createAction(InitialSearchActions.getInitialSearchSuccess)(respond), searchDataIndex);
            })
            .catch((error) => {
                dispatch(createAction(InitialSearchActions.getInitialSearchFailed)(error));
            });
    };
};

const getNextSearchResultData = (request, searchDataIndex) => {
    return (dispatch) => {
        dispatch(createAction(NextSearchActions.getNextSearchStart)());
        callApi.get(apiData.searchURL, request)
            .then((respond) => {
                dispatch(createAction(NextSearchActions.getNextSearchSuccess)(respond), searchDataIndex);
            })
            .catch((error) => {
                dispatch(createAction(NextSearchActions.getNextSearchSuccess)(error));
            });
    };
};

const testInitialSearchResultData = (searchKey, searchType, searchDataIndex) => {
    return (dispatch) => {
        dispatch(createAction(InitialSearchActions.getInitialSearchStart)());
        dispatch(createAction(InitialSearchActions.getInitialSearchSuccess)(
            formatData.searchResultIndex(ApiSimulation.getSearchData(), searchDataIndex)));
    };
};

const testNextSearchResultData = (searchKey, searchDataIndex) => {
    return (dispatch) => {
        dispatch(createAction(NextSearchActions.getNextSearchStart)());
        dispatch(createAction(NextSearchActions.getNextSearchSuccess)(
            formatData.searchResultIndex(ApiSimulation.getSearchData(), searchDataIndex)));
    };
};

export const SearchActionsCreator = {
    getInitialSearchResultData,
    getNextSearchResultData,
    testInitialSearchResultData,
    testNextSearchResultData
};

export default function SearchReducer(state = {action: ''}, action) {
    switch (action.type) {
        case ClearSearchActions.clearSearchData:
        case InitialSearchActions.getInitialSearchSuccess:
        case InitialSearchActions.getInitialSearchFailed:
        case NextSearchActions.getNextSearchSuccess:
        case NextSearchActions.getNextSearchFailed:
            return {action: action};
        
        default:
            return state;
    }
}

