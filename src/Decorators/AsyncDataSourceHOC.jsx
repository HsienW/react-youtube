import React, {Component} from 'react';
import {callApi} from '../ApiCenter/Api/callApi';

export const AsyncDataSourceHOC = (apiURL, request) => (WrappedComponent) => {
    return class asyncDataSourceHOC extends Component {

        constructor() {
            super();
            this.state = {
                getDataState: true,
                loadingPass: false,
                stateMessage: '',
                sourceData: []
            };
        }

        componentDidMount() {
            callApi.get(apiURL, request)
                .then((respond) => {
                    this.setState({
                        getDataState: true,
                        loadingPass: true,
                        sourceData: respond,
                        stateMessage: '',
                    });
                })
                .catch((error) => {
                    this.setState({
                        getDataState: false,
                        loadingPass: true,
                        sourceData: [],
                        stateMessage: error
                    });
                });
        }

        render() {
            return (
                <WrappedComponent {...this.state} {...this.props}/>
            );
        }
    };
};

