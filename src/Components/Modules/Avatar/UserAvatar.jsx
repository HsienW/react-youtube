import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'antd';

export default class UserAvatar extends Component {

    avatarClick = () => {
        console.log('4444444444444444444444444444444');
        // this.props.itemClickAction(event.key);
    };

    render() {
        const {avatarData} = {...this.props};
        return (
            <Avatar
                size={avatarData.imgSize}
                src={avatarData.imgURL}
                onClick={this.avatarClick}
            />
        );
    }
}

UserAvatar.propTypes = {
    avatarData: PropTypes.object.isRequired,
    // avatarClick: PropTypes.func.isRequired
};

