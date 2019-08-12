import React, {Component} from 'react';
import {callApi} from '../ApiCenter/Api/callApi';

export const GetDataSourceHOC = (WrappedComponent) => {
    return class getDataSourceHOC extends Component {

        constructor() {
            super();
            this.state = {
                getDataState: true,
                loadingPass: false,
                stateMessage: '',
                sourceData: []
            };
        }

        callApiGetData = (apiURL, request) => {
            callApi.get(apiURL, request)
                .then((respond) => {
                    this.setState({
                        getDataState: true,
                        loadingPass: true,
                        sourceData: respond,
                        stateMessage: '',
                    });
                    return respond;
                })
                .catch((error) => {
                    this.setState({
                        getDataState: false,
                        loadingPass: true,
                        sourceData: [],
                        stateMessage: error
                    });
                    return error;
                });
        };

        render() {
            return (
                <WrappedComponent {...this.state} {...this.props} callApi={this.callApiGetData}/>
            );
        }
    };
};
