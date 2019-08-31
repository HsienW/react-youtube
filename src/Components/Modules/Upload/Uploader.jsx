import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Upload, Icon, message} from 'antd';

const {Dragger} = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success('file uploaded successfully.');
        } else if (status === 'error') {
            message.error('file upload failed.');
        }
    },
};

export default class Uploader extends Component {
    render() {
        const {configData} = {...this.props};
        return (
            <Dragger
                {...props}
                multiple={true}
            >
                <p className="ant-upload-drag-icon">
                    <Icon type={configData.iconType} style={configData.iconStyle}/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
        );
    }
}

Uploader.propTypes = {
    // uploaderData: PropTypes.object.isRequired,
    configData: PropTypes.object.isRequired,
    // itemClickAction: PropTypes.func.isRequired
};