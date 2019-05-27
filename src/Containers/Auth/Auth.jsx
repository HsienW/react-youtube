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

const homeDefaultRequest = {
    part: 'snippet, contentDetails',
    mine: true,
    access_token: sessionStorage.getItem('ACCESS_TOKEN'),
    maxResults: 20,
    chart: 'mostPopular'
};

class Auth extends Component {

    authSuccess = (response) => {
        WebStorage.setSessionStorage(WebStorageKeys.ACCESS_TOKEN, response.access_token);
        this.props.AuthActionsCreator.getAuthSuccess();
        this.props.HomeActionsCreator.getHomeData(homeDefaultRequest);
        this.props.PortalActionsCreator.changeToPage('home');
    };

    authFailed = () => {
        this.props.AuthActionsCreator.getAuthFailed();
    };

    render() {
        return (
            <AuthView>
                <div>Youtube</div>
                <Input placeholder="Account"/>
                <Input type="password" placeholder="Password"/>
                <Button style={btnStyle} onClick={this.authSuccess}>Login</Button>
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
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthRedux.AuthActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch),
            HomeActionsCreator: bindActionCreators(HomeRedux.HomeActionsCreator, dispatch)
        };
    }
)(Auth);