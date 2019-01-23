import {createAction} from 'redux-actions';

export const PortalActions = {
    goToPage: 'GO_TO_PAGE',
    stopPortal : 'STOP_PORTAL'
};

const goToPage = () => {
    return (dispatch) => {
        dispatch(createAction(PortalActions.goToPage));
    };
};

const stopPortal = () => {
    return (dispatch) => {
        dispatch(createAction(PortalActions.stopPortal));
    };
};

export const PortalActionsCreator = {
    goToPage,
    stopPortal
};

export default function PortalReducer(state = {actionType: ''}, action) {
    switch (action.type) {
        case PortalActions.goToPage:
        case PortalActions.stopPortal:
            return {actionType: action.type};

        default:
            return state;
    }
}

