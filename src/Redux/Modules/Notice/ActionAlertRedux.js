import {createAction} from 'redux-actions';
import {
    HeaderRedux,
    SearchRedux,
    HomeRedux,
    MyChannelRedux,
    PlayRedux,
    UploadRedux
} from '../../../Redux/Modules';

export const ActionAlertActions = {
    hideActionAlert: 'HIDE_ACTION_ALERT',
};

const hideActionAlert = () => {
    return (dispatch) => {
        dispatch(createAction(ActionAlertActions.hideActionAlert)());
    };
};

export const ActionAlertCreator = {
    hideActionAlert,
};

export default function ActionAlertReducer(state = {action: ''}, action) {
    switch (action.type) {
        case ActionAlertActions.hideActionAlert:
        case HeaderRedux.SubscribeActions.getSubscribeFailed:
        case HomeRedux.HomeRecommendActions.getHomeRecommendFailed:
        case SearchRedux.InitialSearchActions.getInitialSearchFailed:
        case SearchRedux.NextSearchActions.getNextSearchFailed:
        case MyChannelRedux.MyChannelActions.getMyChannelFailed:
        case MyChannelRedux.MyUploadListActions.getMyUploadListFailed:
        case MyChannelRedux.MyLikeListActions.getMyLikeListFailed:
        case PlayRedux.PlayVideoActions.getPlayVideoFailed:
        case PlayRedux.PlayDetailActions.getPlayDetailFailed:
        case PlayRedux.PlayCommentActions.getPlayCommentFailed:
        case PlayRedux.PlayRelatedActions.getPlayRelatedFailed:
        case UploadRedux.UploadVideoActions.doUploadVideoSuccess:
        case UploadRedux.UploadVideoActions.doUploadVideoFailed:
            return {action: action};

        default:
            return state;
    }
}
