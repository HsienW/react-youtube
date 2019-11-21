import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Upload, Icon} from 'antd';

const {Dragger} = Upload;

export default class Uploader extends Component {
    
    handleChangeSync = (files) => {
        this.props.stateSyncAction(files);
    };
    
    handleBeforeUpload = (file, fileList) => {
        this.props.beforeUploadAction(file, fileList);
        return false;
    };
    
    handlePreviewUpload = (file) => {
        this.props.previewUploadAction(file);
    };
   
    render() {
        const {uploaderConfig, uploadFileList} = {...this.props};
        return (
            <Dragger
                name={uploaderConfig.dragger.fileName}
                multiple={uploaderConfig.dragger.multiple}
                listType={uploaderConfig.dragger.previewListType}
                fileList={uploadFileList}
                onChange={this.handleChangeSync}
                beforeUpload={this.handleBeforeUpload}
                onPreview={this.handlePreviewUpload}
            >
                <p className='ant-upload-drag-icon'>
                    <Icon type={uploaderConfig.icon.type} style={uploaderConfig.icon.style}/>
                </p>
                <p className='ant-upload-text'>{uploaderConfig.title}</p>
                <p className='ant-upload-hint'>{uploaderConfig.description}</p>
            </Dragger>
        );
    }
}

Uploader.propTypes = {
    uploaderConfig: PropTypes.object.isRequired,
    stateSyncAction: PropTypes.func.isRequired,
    beforeUploadAction: PropTypes.func.isRequired,
    previewUploadAction: PropTypes.func.isRequired
};
