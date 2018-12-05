import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../../Redux/Modules/Home/HomeActions';
import Header from '../../Components/Layout/Header/Header';


class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header data={this.props}/>
                HomeView
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
            HomeActions: bindActionCreators(HomeActions, dispatch)
        };
    }
)(Home);