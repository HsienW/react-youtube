import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalActionsCreator} from '../../Redux/Modules/Portal/PortalRedux';

class Portal extends Component {

    goToPageHistory = (url) => {
        this.props.history.push(`${url}`);
        this.props.PortalActionsCreator.stopPortal();
    };

    render() {
        return null;
    }
}

Portal.propTypes = {
    PortalActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {actionType: state.PortalReducer.actionType};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalActionsCreator, dispatch)
        };
    }
)(Portal);