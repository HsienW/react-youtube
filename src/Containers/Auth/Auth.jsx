import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'antd';
import {GoogleLogin} from 'react-google-login';
import * as AuthRedux from '../../Redux/Modules/Auth/AuthRedux';
import * as Config from '../../../config';
import * as Style from '../../Common/Style';

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

    state = {
        test: false
    };

    componentDidUpdate() {
        if (this.state.test) {
            this.test();
        }
    }

    static getDerivedStateFromProps(nextProps) {
        switch (nextProps.actionType) {
            case AuthRedux.AuthActions.getAuthSuccess:
                return {test: true};

            case AuthRedux.AuthActions.getAuthFailed:
                return null;

            default:
                break;
        }
        return null;
    }

    test = () => {
        this.props.AuthActionsCreator.getTest('97498449');
    };

    getAuthSuccess = () => {
        this.props.AuthActionsCreator.getAuthSuccess('8888888');
    };

    getAuthFailed = (response) => {
        console.log(response);
    };

    render() {
        return (
            <AuthView>
                <div>Youtube</div>
                <Input placeholder="Account"/>
                <Input type="password" placeholder="Password"/>
                <Button style={btnStyle} onClick={this.getAuthSuccess}>Login</Button>
                <GoogleLogin
                    clientId={Config.googleAuthKey}
                    render={renderProps => (<Button style={btnStyle} onClick={renderProps.onClick}>Google</Button>)}
                    onSuccess={this.getAuthSuccess}
                    onFailure={this.getAuthFailed}
                />
            </AuthView>
        );
    }
}

Auth.propTypes = {
    AuthActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthRedux.AuthActionsCreator, dispatch)
        };
    }
)(Auth);