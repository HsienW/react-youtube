import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActionsCreator from '../../Redux/Modules/Auth/AuthActionsCreator';


class AuthView extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                AuthView
            </div>
        );
    }
}

AuthView.propTypes = {
    AuthActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthActionsCreator, dispatch)
        };
    }
)(AuthView);