import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../../Redux/Modules/Home/HomeActions';
// import PropTypes from 'prop-types';
import Video from '../../Components/Modules/Video/Video';
import styled from 'styled-components';

const HomeView = styled.div`
    padding: 0 10%;
`;


class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <HomeView>
                <Video></Video>
            </HomeView>
        );
    }
}

// HomeView.propTypes = {
//     HomeActions: PropTypes.object.isRequired,
// };

export default connect(
    (state) => {
        return {actionType: state.HomeReducer.actionType};
    },
    (dispatch) => {
        return {
            HomeActions: bindActionCreators(HomeActions, dispatch)
        };
    }
)(Home);