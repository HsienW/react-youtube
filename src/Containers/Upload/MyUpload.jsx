import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
// import {Header} from '../../Components/Layout';
import {PageDivider} from '../../Components/Modules';
import {uploadApi} from '../../ApiCenter/Api/Api';
// import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';'
import {Upload, Icon} from 'antd';
import * as StyleConfig from '../../Common/StyleConfig';

const {Dragger} = Upload;

const MyUploadView = styled.div`
    padding: 7vh 8vw 0 8vw;
    height: 100vh;
    width: 100%;
`;

const UploaderArea = styled.div`
    padding: 0 10vw;
    height: 40vh;
`;

const uploadDividerData = {
    title: 'Upload Video'
};

const uploaderConfigData = {
    title: 'Click or drag file to this area to upload',
    description: 'Support for a single or bulk video upload.',
    icon: {
        type: 'plus',
        style: {
            color: StyleConfig.MainColor
        }
    },
    dragger: {
        fileName: 'file',
        multiple: false,
        previewListType: 'picture',
    }
};

class MyUpload extends Component {
    
    handleUploadVideoType = (videoFileInfo) => {
    
        if (videoFileInfo.file.status === 'done') {
            console.log('[[[[[[[[[[[[[[[[[[[[[[[[');
            // message.success(`${info.file.name} file uploaded successfully.`);
        }

        if (videoFileInfo.file.status === 'error') {
            console.log('mmmmmmmmmmmmmmmmm');
            // message.error(`${info.file.name} file upload failed.`);
        }
        
        // const userToken = WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN);
        // const uploadVideoRequest = uploadApi.createUploadVideoRequest(
        //     'snippet,statistics,contentDetails',
        //     true,
        //     userToken,
        //     'post',
        //     videoFileInfo.file
        // );
        // this.props.UploadActionsCreator.doUploadVideo(uploadVideoRequest);
    };
    
    render() {
        return (
            <div>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Dragger
                            name={uploaderConfigData.dragger.fileName}
                            multiple={uploaderConfigData.dragger.multiple}
                            listType={uploaderConfigData.dragger.previewListType}
                            action={uploadApi.getUploadVideoURL()}
                            onChange={this.handleUploadVideoType}
                            // customRequest={this.doUploadVideos}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type={uploaderConfigData.icon.type} style={uploaderConfigData.icon.style}/>
                            </p>
                            <p className="ant-upload-text">{uploaderConfigData.title}</p>
                            <p className="ant-upload-hint">{uploaderConfigData.description}</p>
                        </Dragger>
                    </UploaderArea>
                </MyUploadView>
            </div>
        );
    }
}

MyUpload.propTypes = {
    UploadActionsCreator: PropTypes.object.isRequired,
};

export default connect(
    (state) => {
        return {action: state.UploadReducer.action};
    },
    (dispatch) => {
        return {
            UploadActionsCreator: bindActionCreators(UploadRedux.UploadActionsCreator, dispatch)
        };
    }
)(MyUpload);
