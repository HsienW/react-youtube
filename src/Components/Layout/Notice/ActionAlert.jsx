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
    ActionAlertRedux
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
    
    showActionAlert = (configData, errorData) => {
        notification[configData.type]({
            message: errorData.code,
            description: errorData.message,
            onClose: this.hideActionAlert
        });
    };
    
    hideActionAlert = () => {
        this.props.ActionAlertActionCreator.hideActionAlert();
    };
    
    render() {
        const {configData} = {...this.props};
        return (
            <div>
                {this.state.showAlert ? this.showActionAlert(configData, this.state.actionNoticeData) : null}
            </div>
        );
    }
}

ActionAlert.propTypes = {
    configData: PropTypes.object.isRequired,
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
