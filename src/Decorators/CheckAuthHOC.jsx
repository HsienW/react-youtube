import React, {Component} from 'react';
import {Auth} from '../../src/Containers/index';

export const CheckAuthHOC = (WrappedComponent) => {
    return class checkAuthHOC extends Component {

        constructor(props) {
            super(props);
            this.state = {
                authPass: true,
            };
        }

        componentDidMount() {
            const accessToken = sessionStorage.getItem('ACCESS_TOKEN');
            if (accessToken !== null) {
                this.setState({authPass: true});
            } else {
                this.setState({authPass: false});
            }
        }

        render() {
            if (!this.state.authPass) {
                return (<Auth/>);
            }
            return (
                <WrappedComponent {...this.state} {...this.props}/>
            );
        }
    };
};
