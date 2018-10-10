import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActionsCreator from '../../Redux/Modules/Auth/AuthActionsCreator';


class UploadView extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                UploadView
            </div>
        );
    }
}

UploadView.propTypes = {
    AuthActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {actionType: state.UploadReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthActionsCreator, dispatch)
        };
    }
)(UploadView);