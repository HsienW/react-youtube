import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ChannelActionsCreator} from '../../Redux/Modules/Channel/ChannelRedux';
import {VideoItem} from '../../Components/Modules/index';
import styled from 'styled-components';

const MyChannelView = styled.div`
    padding: 0 10%;
`;


class MyChannel extends Component {
    render() {
        return (
            <MyChannelView>
                <VideoItem></VideoItem>
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
