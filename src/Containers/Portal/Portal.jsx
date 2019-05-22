import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PortalActionsCreator} from '../../Redux/Modules/Portal/PortalRedux';
import {PortalRedux} from '../../Redux/Modules';

class Portal extends Component {

    state = {
        goToPage: false,
        pageURL: ''
    };

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.action.type) {
            case PortalRedux.PortalActions.goToPage:
                return {goToPage: true, pageURL: nextProps.action.payload};

            case PortalRedux.PortalActions.stopPortal:
                return {goToPage: false, pageURL: ''};

            default:
                break;
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.goToPage) {
            this.changeToPage();
        }
    }

    changeToPage = () => {
        this.props.history.push(this.state.pageURL);
        this.props.PortalActionsCreator.stopPortal();
    };

    render() {
        return null;
    }
}

Portal.propTypes = {
    history: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.PortalReducer.action};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalActionsCreator, dispatch)
        };
    }
)(Portal);