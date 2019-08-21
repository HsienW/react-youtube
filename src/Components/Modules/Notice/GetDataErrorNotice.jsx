import React, {Component} from 'react';
import {Alert} from 'antd';

export default class GetDataErrorNotice extends Component {
    render() {
        return (
            <Alert
                message="Error"
                description="Error please try again!"
                type="error"
            />
        );
    }
}
