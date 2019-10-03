import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {Header} from '../../Components/Layout';
import {PageDivider} from '../../Components/Modules';
import {Upload, Icon} from 'antd';
import * as StyleConfig from '../../Common/StyleConfig';
// import {message} from 'antd';

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
    }
};

// const props = {
//     name: 'file',
//     multiple: true,
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     onChange(info) {
//         const {status} = info.file;
//         if (status !== 'uploading') {
//             console.log('正在正在正在正在正在正在正在正在正在');
//             console.log(info);
//         }
//         if (status === 'done') {
//             console.log('成功成功成功成功成功成功成功成功成功成功成功');
//             console.log(info);
//             message.success('file uploaded successfully.');
//         } else if (status === 'error') {
//             console.log('失敗失敗失敗失敗失敗失敗失敗失敗失敗失敗失敗');
//             message.error('file upload failed.');
//         }
//     },
// };

// const props = {
//     action: '//jsonplaceholder.typicode.com/posts/',
//     listType: 'picture',
//     previewFile(file) {
//         console.log('Your upload file:', file);
//         // Your process logic. Here we just mock to the same file
//         // return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
//         //     method: 'POST',
//         //     body: file,
//         // })
//         //     .then(res => res.json())
//         //     .then(({ thumbnail }) => thumbnail);
//     },
// };

class MyUpload extends Component {
    
    constructor() {
        super();
        this.state = {
            uploadURL: '',
            previewType: 'picture',
            previewStatus: false,
            uploadVideoData: {
                name: 'file',
                multiple: true,
                action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            }
        };
    }
    
    previewUpload = (videoFileInfo) => {
        console.log(videoFileInfo);
    };
    
    // doUploadVideos = (videoFileInfo) => {
    //     console.log('8888888888888888888888888888888888');
    //     console.log(videoFileInfo);
    // };
    
    render() {
        return (
            <div>
                <Header/>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Dragger
                            name={this.state.uploadVideoData.name}
                            multiple={this.state.uploadVideoData.multiple}
                            action={this.state.uploadVideoData.action}
                            showUploadList={false}
                            previewFile={this.previewUpload}
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