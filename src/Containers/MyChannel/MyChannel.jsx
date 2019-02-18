import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {ChannelActionsCreator} from '../../Redux/Modules/Channel/ChannelRedux';
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
        return {actionType: state.ChannelReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActions: bindActionCreators(ChannelActionsCreator, dispatch)
        };
    }
)(MyChannel);
