import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadActionsCreator} from '../../Redux/Modules/Upload/UploadRedux';


class Upload extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                UploadView
            </div>
        );
    }
}

// UploadView.propTypes = {
//     UploadActionsCreator: PropTypes.object.isRequired,
// };

export default connect(
    (state) => {
        return {actionType: state.UploadReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(UploadActionsCreator, dispatch)
        };
    }
)(Upload);