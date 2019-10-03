import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'antd';
import {GoogleAuthorize} from 'react-google-authorize';
import {AuthRedux, PortalRedux, HomeRedux} from  '../../Redux/Modules';
import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
import * as Config from '../../../config';
import * as StyleConfig from '../../Common/StyleConfig';

const AuthView = styled.div`
    width: 280px;
    height: 320px;
    margin: 10% auto 0;
    padding: 30px 30px;
    font-size: 30px;
    color: ${StyleConfig.FontMinorColor}
    border: ${StyleConfig.FontMinorColor} 1px solid;
    border-radius: 5px;
`;

const btnStyle = {
    width: '100%',
    color: `${StyleConfig.FontMainColor}`,
    backgroundColor: `${StyleConfig.MinorColor}`
};

class Auth extends Component {

    authSuccess = (response) => {
        WebStorage.setSessionStorage(WebStorageKeys.ACCESS_TOKEN, response.access_token);
        this.props.AuthActionsCreator.getAuthSuccess();
        this.props.PortalActionsCreator.changeToPage('home');
    };

    authFailed = () => {
        this.props.AuthActionsCreator.getAuthFailed();
    };

    render() {
        return (
            <AuthView>
                <div>React-Youtube</div>
                <Input placeholder="Account"/>
                <Input type="password" placeholder="Password"/>
                <Button style={btnStyle}>Login</Button>
                <GoogleAuthorize
                    clientId={Config.googleAuthKey}
                    scope={Config.googleAuthScope}
                    render={renderProps => (<Button style={btnStyle} onClick={renderProps.onClick}>Google</Button>)}
                    onSuccess={this.authSuccess}
                    onFailure={this.authFailed}
                />
            </AuthView>
        );
    }
}

Auth.propTypes = {
    AuthActionsCreator: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    HomeActionsCreator: PropTypes.object.isRequired
};

export default connect(
    (state) => {
        return {action: state.AuthReducer.action};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthRedux.AuthActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            HomeActionsCreator: bindActionCreators(HomeRedux.HomeActionsCreator, dispatch)
        };
    }
)(Auth);