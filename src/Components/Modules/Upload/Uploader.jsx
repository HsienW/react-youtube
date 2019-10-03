import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Upload, Icon} from 'antd';

const {Dragger} = Upload;

export default class Uploader extends Component {
    render() {
        const {configData, uploadDraggerConfigData} = {...this.props};
        return (
            <Dragger
                name={uploadDraggerConfigData.name}
                multiple={uploadDraggerConfigData.multiple}
                action={uploadDraggerConfigData.action}
                onChange={uploadDraggerConfigData.onChange}
            >
                <p className="ant-upload-drag-icon">
                    <Icon type={configData.icon.type} style={configData.icon.style}/>
                </p>
                <p className="ant-upload-text">{configData.title}</p>
                <p className="ant-upload-hint">{configData.description}</p>
            </Dragger>
        );
    }
}

Uploader.propTypes = {
    // uploaderData: PropTypes.object.isRequired,
    configData: PropTypes.object.isRequired,
    uploadDraggerConfigData: PropTypes.object.isRequired,
    // itemClickAction: PropTypes.func.isRequired
};