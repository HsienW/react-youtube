import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'antd';
import {ActionsCreator} from '../../Redux/Modules/Auth/ReduxWidgets';
import * as Style from '../../Common/Style';
import * as AuthActionsCreator from '../../Redux/Modules/Auth/AuthActionsCreator';

const AuthView = styled.div`
    width: 280px;
    height: 320px;
    margin: 10% auto 0;
    padding: 30px 30px;
    font-size: 30px;
    color: ${Style.FontMinorColor}
    border: ${Style.FontMinorColor} 1px solid;
    border-radius: 5px;
`;

const btnStyle = {
    width: '100%',
    color: `${Style.FontMainColor}`,
    backgroundColor: `${Style.MinorColor}`
};

class Auth extends Component {
    constructor() {
        super();
        this.state = {};
    }

    test = () => {
        ActionsCreator.clicked();
    };

    render() {
        return (
            <AuthView>
                <div>Youtube</div>
                <Input placeholder="Account" />
                <Input type="password" placeholder="Password" />
                <Button style={btnStyle} onClick={this.test} c>Login</Button>
                <Button style={btnStyle}>Google</Button>
            </AuthView>
        );
    }
}

// AuthView.propTypes = {
//     AuthActionsCreator: PropTypes.object.isRequired,
// };

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthActionsCreator, dispatch)
        };
    }
)(Auth);