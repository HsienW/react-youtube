import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'antd';

export default class UserAvatar extends Component {

    avatarClick = () => {
        console.log('4444444444444444444444444444444');
        // this.props.itemClickAction(event.key);
    };

    render() {
        const {configData} = {...this.props};
        return (
            <Avatar
                size={configData.imgSize}
                src={configData.imgURL}
                onClick={this.avatarClick}
            />
        );
    }
}

UserAvatar.propTypes = {
    configData: PropTypes.object.isRequired,
    // avatarClick: PropTypes.func.isRequired
};

