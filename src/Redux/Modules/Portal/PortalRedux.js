import {createAction} from 'redux-actions';

export const PortalActions = {
    goToPage: 'GO_TO_PAGE',
    stopPortal : 'STOP_PORTAL'
};

const changeToPage = (url) => {
    return (dispatch) => {
        dispatch(createAction(PortalActions.goToPage)(url));
    };
};

const stopPortal = () => {
    return (dispatch) => {
        dispatch(createAction(PortalActions.stopPortal)());
    };
};

export const PortalActionsCreator = {
    changeToPage,
    stopPortal
};

export default function PortalReducer(state = {action: ''}, action) {
    switch (action.type) {
        case PortalActions.goToPage:
        case PortalActions.stopPortal:
            return {action: action};

        default:
            return state;
    }
}

