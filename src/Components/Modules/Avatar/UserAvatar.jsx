import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar';
// import 'antd/es/Avatar/style/css';

export default class UserAvatar extends Component {

    avatarClick = () => {
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

