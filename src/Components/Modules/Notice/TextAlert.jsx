import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'antd';

export default class TextAlert extends Component {
    render() {
        const {configData, contentData} = {...this.props};
        return (
            <div style={{margin: configData.margin}}>
                <Alert
                    message={contentData.title}
                    description={contentData.description}
                    type={configData.type}
                    showIcon
                />
            </div>
        );
    }
}

TextAlert.propTypes = {
    configData: PropTypes.object.isRequired,
    contentData: PropTypes.object.isRequired
};
