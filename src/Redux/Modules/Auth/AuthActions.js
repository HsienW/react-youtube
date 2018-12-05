const GET_AUTH_START = 'src/Redux/Modules/Auth/AuthActions';
const GET_AUTH_SUCCESS = 'src/Redux/Modules/Auth/AuthActions';
const GET_AUTH_FAILED = 'src/Redux/Modules/Auth/AuthActions';

/**

 改用 Ducks redux 測試

 **/

export default function AuthReducer (state = {actionType: ''}, action) {
    switch (action.type) {
        case GET_AUTH_START:
        case GET_AUTH_SUCCESS:
        case GET_AUTH_FAILED:
            return {actionType: action.type};

        default:
            return state;
    }
}
