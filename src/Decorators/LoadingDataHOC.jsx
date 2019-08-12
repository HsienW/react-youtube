import React, {Component} from 'react';
import {Spin} from 'antd';
import {SpinStyle} from '../Common/Style';

export const LoadingDataHOC = (WrappedComponent) => {
    return class loadingDataHOC extends Component {

        constructor(props) {
            super(props);
            this.state = {
                showLoading: true
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
