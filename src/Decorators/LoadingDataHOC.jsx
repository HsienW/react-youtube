import React, {Component} from 'react';
import {SpinStyle} from '../Common/StyleConfig';
import {Spin} from 'antd';

export const LoadingDataHOC = (WrappedComponent) => {
    return class loadingDataHOC extends Component {
        
        constructor() {
            super();
            this.state = {
                showLoading: false
            };
        }
        
        toggleShowLoading = (toggleState) => {
            this.setState({
                showLoading: toggleState,
            });
        };

        render() {
            if (this.state.showLoading) {
                return (
                    <Spin size='large' style={SpinStyle}>
                        <WrappedComponent {...this.props} toggleShowLoading={this.toggleShowLoading}/>
                    </Spin>
                );
            }
            return (
                <WrappedComponent {...this.props} toggleShowLoading={this.toggleShowLoading}/>
            );
        }
    };
};
