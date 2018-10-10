import * as ChannelActions from './ChannelActions';

const ChannelReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case ChannelActions.GET_START:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default ChannelReducer;