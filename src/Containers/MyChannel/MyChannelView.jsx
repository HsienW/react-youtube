import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../../Redux/Modules/Auth/AuthActions';


class MyChannelView extends Component {

    render() {
        return (
            <div></div>
        );
    }
}

MyChannelView.propTypes = {
    dataSource: PropTypes.array.isRequired,
};

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActions: bindActionCreators(AuthActions, dispatch)
        };
    }
)(MyChannelView);
