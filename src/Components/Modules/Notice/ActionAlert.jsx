import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {notification} from 'antd';

const userActionNotice = (configData, errorData) => {
    notification[configData.type]({
        message: errorData.code,
        description: errorData.message
    });
};

export default class ActionAlert extends Component {
    render() {
        const {configData, userActionNoticeData} = {...this.props};
        return (
            <div>
                {userActionNotice(configData, userActionNoticeData)}
            </div>
        );
    }
}

ActionAlert.propTypes = {
    userActionNoticeData: PropTypes.object.isRequired,
    configData: PropTypes.object.isRequired,
};
