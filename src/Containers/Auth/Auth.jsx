import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'antd';
import {GoogleAuthorize} from 'react-google-authorize';
import {AuthRedux, PortalRedux} from  '../../Redux/Modules';
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

    authSuccess = (response) => {
        this.props.AuthActionsCreator.getAuthSuccess(response.access_token);
        this.props.PortalActionsCreator.changeToPage('home');
    };

    authFailed = (response) => {
        console.log(response);
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
    PortalActionsCreator: PropTypes.object.isRequired
};

export default connect(
    (state) => {
        return {actionType: state.AuthReducer.actionType};
    },
    (dispatch) => {
        return {
            AuthActionsCreator: bindActionCreators(AuthRedux.AuthActionsCreator, dispatch),
            PortalActionsCreator: bindActionCreators(PortalRedux.PortalActionsCreator, dispatch)
        };
    }
)(Auth);