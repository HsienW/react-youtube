import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Result} from 'antd';

export default class UserActionResult extends Component {
    render() {
        const {userActionResultData} = {...this.props};
        return (
            <Result
                title={userActionResultData.title}
            />
        );
    }
}

UserActionResult.propTypes = {
    userActionResultData: PropTypes.object.isRequired,
};
