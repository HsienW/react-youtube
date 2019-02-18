import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'antd';
import {GoogleLogin} from 'react-google-login';
import {AuthActionsCreator} from '../../Redux/Modules/Auth/AuthRedux';
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

    // componentDidUpdate() {
    //
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    //     console.log(nextProps, prevState);
    //     if (prevState !== nextProps) {
    //         return Promise.resolve(this.test(nextProps));
    //     }
    //     return null;
    // }

    test = () => {
        console.log('7777777777777777777777777');
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
            AuthActionsCreator: bindActionCreators(AuthActionsCreator, dispatch)
        };
    }
)(Auth);