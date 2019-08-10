import React, {Component} from 'react';
import {Spin} from 'antd';
import {SpinStyle} from '../Common/Style';
import is from 'is_js';

export const LoadingDataHOC = (WrappedComponent) => {
    return class loadingDataHOC extends Component {

        render() {
            if (is.empty(this.props.action)) {
                return (
                    <Spin size='large' style={SpinStyle}>
                        <WrappedComponent {...this.props} />
                    </Spin>
                );
            }
            return (
                <WrappedComponent {...this.props} />
            );
        }
    };
};
