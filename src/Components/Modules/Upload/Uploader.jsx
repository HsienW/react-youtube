import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
// import 'antd/es/Upload/style/css';
// import 'antd/es/Icon/style/css';

const {Dragger} = Upload;

export default class Uploader extends Component {
    render() {
        const {configData, uploadDraggerConfigData} = {...this.props};
        return (
            <Dragger
                name={uploadDraggerConfigData.name}
                multiple={uploadDraggerConfigData.multiple}
                action={uploadDraggerConfigData.action}
                // beforeUpload={uploadDraggerConfigData.previewFile}
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
