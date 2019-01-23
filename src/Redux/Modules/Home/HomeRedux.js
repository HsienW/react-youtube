import {createAction} from 'redux-actions';

export const HomeActions = {
    getHomeStart: 'GET_HOME_START',
    getHomeSuccess: 'GET_HOME_SUCCESS',
    getHomeFailed: 'GET_HOME_FAILED',
};

const getHomeSuccess = () => {
    return (dispatch) => {
        dispatch(createAction(HomeActions.getHomeStart));
    };
};

export const HomeActionsCreator = {
    getHomeSuccess,
};

export default function HomeReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case HomeActions.getHomeStart:
            return {actionType: action.type};

        default:
            return state;
    }
}

