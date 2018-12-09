import {createAction} from 'redux-actions';

export const Actions = {
    GET_AUTH_START: 'GET_AUTH_START',
    GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS',
    GET_AUTH_FAILED: 'GET_AUTH_FAILED'
};

/**

 改用 Ducks redux 測試

 **/

export const ActionsCreator = {
    clicked: function () {
        return (dispatch) => {
            dispatch(createAction(Actions.GET_AUTH_SUCCESS));
        };
    }
};

export default function AuthReducer(state = {actionType: ''}, action) {
    console.log('test test test');
    console.log(action);
    switch (action.type) {
        case Actions.GET_AUTH_START:
        case Actions.GET_AUTH_SUCCESS:
        case Actions.GET_AUTH_FAILED:
            return {actionType: action.type};

        default:
            return state;
    }
}
