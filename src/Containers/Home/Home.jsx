import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HomeActionsCreator} from '../../Redux/Modules/Home/HomeRedux';
import {PageTitle, Video} from '../../Components/Modules/index';
import {Header} from '../../Components/Layout/index';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

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
            <div>
                <Header />
                <HomeView>
                    <PageTitle />
                    <Video />
                </HomeView>
            </div>
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
            HomeActions: bindActionCreators(HomeActionsCreator, dispatch)
        };
    }
)(Home);