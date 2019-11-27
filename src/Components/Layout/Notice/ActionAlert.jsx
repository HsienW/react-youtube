import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {notification} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    HeaderRedux,
    SearchRedux,
    HomeRedux,
    MyChannelRedux,
    PlayRedux,
    ActionAlertRedux,
    UploadRedux
} from '../../../Redux/Modules';

class ActionAlert extends Component {
    
    constructor() {
        super();
        this.state = {
            showAlert: false,
            actionNoticeData: {}
        };
    }
    
    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            // simulation call upload api respond
            case UploadRedux.UploadVideoActions.doUploadVideoSuccess:
                nextProps.action.payload.status = 200;
                return {showAlert: true, actionNoticeData: nextProps.action.payload};
                
            case HeaderRedux.SubscribeActions.getSubscribeFailed:
            case HomeRedux.HomeActions.getHomeFailed:
            case SearchRedux.InitialSearchActions.getInitialSearchFailed:
            case SearchRedux.NextSearchActions.getNextSearchFailed:
            case MyChannelRedux.MyChannelActions.getMyChannelFailed:
            case MyChannelRedux.MyUploadListActions.getMyUploadListFailed:
            case MyChannelRedux.MyLikeListActions.getMyLikeListFailed:
            case PlayRedux.PlayVideoActions.getPlayVideoFailed:
            case PlayRedux.PlayDetailActions.getPlayDetailFailed:
            case PlayRedux.PlayCommentActions.getPlayCommentFailed:
            case PlayRedux.PlayRelatedActions.getPlayRelatedFailed:
            case UploadRedux.UploadVideoActions.doUploadVideoFailed:
                return {showAlert: true, actionNoticeData: nextProps.action.payload};
            
            case ActionAlertRedux.ActionAlertActions.hideActionAlert:
                return {showAlert: false, actionNoticeData: {}};
            
            default:
                break;
        }
        
        return null;
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevState.showAlert && !this.state.showAlert) {
            return true;
        }
        return null;
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            this.setState({showAlert: false, actionNoticeData: {}});
        }
    }
    
    showActionAlert = (alertData) => {
        notification[alertData.status === 200 ? 'success' : 'error']({
            message: alertData.status === 200 ? 'Success' : 'Error',
            description: alertData.status === 200 ? 'The operation completed successfully.' : 'The operation failed.',
            onClose: this.hideActionAlert
        });
    };
    
    hideActionAlert = () => {
        this.props.ActionAlertActionCreator.hideActionAlert();
    };
    
    render() {
        return (
            <div>
                {this.state.showAlert ? this.showActionAlert(this.state.actionNoticeData) : null}
            </div>
        );
    }
}

ActionAlert.propTypes = {
    ActionAlertActionCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.ActionAlertReducer.action};
    },
    (dispatch) => {
        return {
            ActionAlertActionCreator: bindActionCreators(ActionAlertRedux.ActionAlertCreator, dispatch),
        };
    }
)(ActionAlert);
