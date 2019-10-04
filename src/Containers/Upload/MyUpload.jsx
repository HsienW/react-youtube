import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {Header} from '../../Components/Layout';
import {PageDivider} from '../../Components/Modules';
import {Upload, Icon} from 'antd';
import {uploadApi} from '../../ApiCenter/Api/Api';
// import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';
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
        multiple: true,
        previewListType: 'picture',
    }
};

class MyUpload extends Component {
    
    // doUploadVideos = (videoFileInfo) => {
    //     console.log('8888888888888888888888888888888888');
    //     console.log(videoFileInfo);
    //     const userToken = WebStorage.getSessionStorage(WebStorageKeys.ACCESS_TOKEN);
    //     const uploadVideoRequest = uploadApi.createUploadVideoRequest(
    //         'snippet,statistics,contentDetails',
    //         true,
    //         userToken,
    //         'post',
    //         videoFileInfo.file
    //     );
    //     this.props.UploadActionsCreator.doUploadVideo(uploadVideoRequest);
    // };
    
    render() {
        return (
            <div>
                <Header/>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Dragger
                            name={uploaderConfigData.dragger.fileName}
                            multiple={uploaderConfigData.dragger.multiple}
                            listType={uploaderConfigData.dragger.previewListType}
                            action={uploadApi.getUploadVideoURL()}
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