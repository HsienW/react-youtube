import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UploadRedux} from '../../Redux/Modules';
import {PageDivider} from '../../Components/Modules';
import {uploadApi} from '../../ApiCenter/Api/Api';
import {Upload, Icon, Button, Modal, Input} from 'antd';
// import {callApi} from '../../ApiCenter/Api/CallApi';
import * as StyleConfig from '../../Common/StyleConfig';
import axios from 'axios';
// import {WebStorage, WebStorageKeys} from '../../Common/WebStorage';'

const {Dragger} = Upload;
const {TextArea} = Input;

const MyUploadView = styled.div`
    padding: 7vh 8vw 0 8vw;
    height: 100vh;
    width: 100%;
`;

const PreviewItemTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`;

const PreviewVideo = styled.div`
    border: 1px solid rgb(232, 232, 232);
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
    
    constructor() {
        super();
        this.state = {
            previewFileList: [],
            uploadFileList: [],
            previewVideoKey: '',
            previewVideoURL: '',
            previewVideoTitle: '',
            previewVideoDesc: '',
            editingTitle: '',
            editingDesc: '',
            visible: false,
            loading: false
        };
    }
    
    handleCancel = () => {
        this.setState({
            previewVideoKey: '',
            previewVideoURL: '',
            previewVideoTitle: '',
            previewVideoDesc: '',
            editingTitle: '',
            editingDesc: '',
            loading: false,
            visible: false,
        });
    };
    
    beforeUploadCheck = (file, fileList) => {
        console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[');
        console.log(file);
        console.log(fileList);
        // const newList = fileList.map((item) => {
        //     item.title = item.name;
        //     item.desc = '';
        //     return item;
        // });
        this.setState({uploadFileList: fileList});
        return false;
    };
    
    previewUploadVideo = (file) => {
        console.log('fffffffffffff');
        console.log(file);
        console.log(URL.createObjectURL(file.originFileObj));
        this.setState({
            previewVideoKey: file.uid,
            previewVideoTitle: file.title,
            previewVideoDesc: file.desc,
            previewVideoURL: URL.createObjectURL(file.originFileObj),
            visible: true,
        });
    };
    
    doUpload = () => {
        const file = this.state.uploadFileList;
        // const reader = new FileReader();
        // // reader.onloadend = function(evt) {
        // //     // const fileBlob = new Blob([evt.target.result], { 'type' : 'fileType' });
        // // };
        const newFile = new Blob(file, {type: 'contentType'});
        //
        const formData = new FormData();
        // const header = {
        //     'Content-Type': 'multipart/form-data'
        // };
        formData.append('file', newFile);
        
        axios({
            method: 'post',
            url: uploadApi.getUploadVideoURL(),
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        });
        // callApi.post(uploadApi.getUploadVideoURL(), formData, header);
    };
    
    onEditingTitleChange = (titleChange) => {
        this.setState({editingTitle: titleChange.target.value});
    };
    
    onEditingDescChange = (descChange) => {
        this.setState({editingDesc: descChange.target.value});
    };
    
    handleOk = () => {
        console.log('11111111111111111111111');
        this.setState({
            loading: true,
            previewVideoTitle: this.state.editingTitle,
            previewVideoDesc: this.state.editingDesc,
        }, () => {
            let newFileList = this.state.uploadFileList.slice(0);
            newFileList.map((item) => {
                if (item.uid === this.state.previewVideoKey) {
                    item.name = this.state.editingTitle;
                    item.title = this.state.editingTitle;
                    item.desc = this.state.editingDesc;
                }
            });
            this.setState({
                uploadFileList: newFileList,
                previewVideoKey: '',
                previewVideoURL: '',
                previewVideoTitle: '',
                previewVideoDesc: '',
                editingTitle: '',
                editingDesc: '',
                loading: false,
                visible: false,
            });
        });
    };
    
    uploadListStateSync = (files) => {
        console.log('Sync-Sync-Sync-Sync-Sync-Sync');
        this.setState({
            uploadFileList: [...files.fileList]
        });
    };
    
    render() {
        console.log('render-render-render-render-render-render');
        console.log(this.state);
        return (
            <div>
                <MyUploadView>
                    <PageDivider dividerData={uploadDividerData}/>
                    <UploaderArea>
                        <Dragger
                            name={uploaderConfigData.dragger.fileName}
                            multiple={uploaderConfigData.dragger.multiple}
                            listType={uploaderConfigData.dragger.previewListType}
                            fileList={this.state.uploadFileList}
                            // action={uploadApi.getUploadVideoURL()}
                            onChange={this.uploadListStateSync}
                            beforeUpload={this.beforeUploadCheck}
                            onPreview={this.previewUploadVideo}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type={uploaderConfigData.icon.type} style={uploaderConfigData.icon.style}/>
                            </p>
                            <p className="ant-upload-text">{uploaderConfigData.title}</p>
                            <p className="ant-upload-hint">{uploaderConfigData.description}</p>
                        </Dragger>
                    </UploaderArea>
                    <Button onClick={this.doUpload}>DoUpload</Button>
                </MyUploadView>
                <Modal
                    visible={this.state.visible}
                    title={this.state.previewVideoTitle}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <PreviewVideo>
                        <video width="472" height="392" src={this.state.previewVideoURL}/>
                    </PreviewVideo>
                    <div style={{margin: '24px 0'}}/>
                    <PreviewItemTitle>
                        Title:
                    </PreviewItemTitle>
                    <Input
                        placeholder="Please enter new video title"
                        value={this.state.editingTitle}
                        onChange={this.onEditingTitleChange}
                    />
                    <div style={{margin: '24px 0'}}/>
                    <PreviewItemTitle>
                        Description:
                    </PreviewItemTitle>
                    <TextArea
                        placeholder="Please enter new video description"
                        value={this.state.editingDesc}
                        autoSize={{minRows: 3, maxRows: 5}}
                        onChange={this.onEditingDescChange}
                    />
                </Modal>
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
