import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthView from '../Views/AuthView';
import * as AuthActionsCreator from '../Actions/AuthActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthActionsCreator, dispatch),
        };
    }
)(AuthView);