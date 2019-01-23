import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import * as AuthActions from '../../Redux/Modules/Auth/AuthActions';
import Video from '../../Components/Modules/Video/Video';
import styled from 'styled-components';

const MyChannelView = styled.div`
    padding: 0 10%;
`;


class MyChannel extends Component {
    render() {
        return (
            <MyChannelView>
                <Video></Video>
            </MyChannelView>
        );
    }
}

// MyChannelView.propTypes = {
//     dataSource: PropTypes.array.isRequired,
// };

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActions: bindActionCreators(AuthActions, dispatch)
        };
    }
)(MyChannel);
