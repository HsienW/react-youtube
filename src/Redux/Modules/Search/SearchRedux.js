import {createAction} from 'redux-actions';

export const SearchActions = {
    getSearchStart: 'GET_SEARCH_START',
    getSearchSuccess: 'GET_SEARCH_SUCCESS',
    getSearchFailed: 'GET_SEARCH_FAILED',
};

const getSearchSuccess = () => {
    return (dispatch) => {
        dispatch(createAction(SearchActions.getSearchStart));
    };
};

export const SearchActionsCreator = {
    getSearchSuccess,
};

export default function SearchReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case SearchActions.getSearchStart:
            return {actionType: action.type};

        default:
            return state;
    }
}

